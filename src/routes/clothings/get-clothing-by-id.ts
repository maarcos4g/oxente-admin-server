import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getClothingById(app: FastifyInstance) {
  app.get('/clothing/:id', async (request, response) => {
    try {
      const getClothingSchema = z.object({
        id: z.string().uuid("Digite um id válido").nonempty(),
      });

      const { id } = getClothingSchema.parse(request.params)

      const clothing = await prisma.clothing.findUnique({
        where: {
          id,
        },
        include: {
          colors: true,
          images: true,
          clothingSize: true
        }
      })

      if (!clothing) {
        console.log("Nenhuma peça de roupa foi encontrada.")
        return response.status(404).send({
          message: "Nenhuma peça de roupa foi encontrada."
        })
      }

      const images = clothing?.images.map(image => {
        return [
          image.fileUrl
        ]
      })

      const colors = clothing?.colors.map(color => {
        return [
          color.color
        ]
      })

      const sizesPromise = clothing?.clothingSize.map(async sizeP => {
        const size = await prisma.size.findUnique({
          where: {
            id: sizeP.sizeId,
          },
        });
        return size?.size!;
      });

      const sizes = await Promise.all(sizesPromise!);

      return {
        id: clothing?.id,
        title: clothing?.title,
        clothingId: clothing?.clothingId,
        price: clothing?.price,
        numberOfParcel: clothing?.numberOfParcel,
        parcelValue: clothing?.parcelValue,
        colors,
        images,
        sizes,
      }
    } catch (error) {
      console.error(error)
      response.status(400).send(error)
    }
  })
}