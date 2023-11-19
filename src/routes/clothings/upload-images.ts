import { randomUUID } from "node:crypto";
import { extname } from "node:path";

import { FastifyInstance } from "fastify";

import { firebaseStorageService } from "../../services/firebase-storage";
import { prisma } from "../../lib/prisma";

export async function uploadImagesRoute(app: FastifyInstance) {
  app.post('/upload', async (request, response) => {
    const upload = await request.file({
      limits: {
        fileSize: 10 * 1024 * 1024 //10 mb
      }
    })

    if (!upload) {
      console.log("Nenhum arquivo enviado.")
      return response.status(400).send({
        message: "Nenhum arquivo enviado."
      })
    }

    const mimeTypeRegex = /^image\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      console.log("Arquivo em formato inválido")
      return response.status(400).send({
        message: "Arquivo em formato inválido"
      })
    }

    const clothingIdField = upload.fields?.clothingId;

    if (!clothingIdField || typeof clothingIdField !== 'object' || !('value' in clothingIdField)) {
      console.log("Nenhum id da roupa foi fornecido ou campo inválido.");
      return response.status(400).send({
        message: "Nenhum clothingId fornecido ou campo inválido.",
      });
    }

    const clothingId = clothingIdField.value as string

    const { bucket } = firebaseStorageService()

    const fileId = randomUUID();
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const metadata = {
      metadata: {
        clothingId,
      },
      contentType: upload.mimetype,
    };

    const bucketFile = bucket.file(`${clothingId}/${fileName}`)

    const stream = bucketFile.createWriteStream({
      metadata,
    })

    stream.on("error", (error) => {
      console.error(error)
      response.status(400).send({
        message: "Ocorreu um erro ao enviar o seu arquivo.",
        error,
      })
    })

    stream.on("finish", async () => {
      await bucketFile.makePublic()

      const [url] = await bucketFile.getSignedUrl({
        action: "read",
        expires: new Date('2030-01-01')
      });

      await prisma.clothing.update({
        where: {
          id: clothingId,
        },
        data: {
          images: {
            create: {
              fileUrl: url,
            }
          }
        }
      })

      response.send({
        url,
        message: "Envio concluido com sucesso!"
      })
    })

    stream.end(await upload.toBuffer())
  })
}