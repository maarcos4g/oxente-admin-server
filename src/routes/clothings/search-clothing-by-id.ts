import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function searchClothingById(app: FastifyInstance) {

  app.get('/clothing/search/id', async (request, response) => {
    try {
      const getClothingBody = z.object({
        clothingId: z.string().nonempty(),
      });

      const { clothingId } = getClothingBody.parse(request.query);

      const clothing = await prisma.clothing.findUnique({
        where: {
          clothingId,
        },
      });

      if (!clothing) {
        console.log("Nenhuma peça de roupa encontrada com o ID fornecido.")
        return response.status(404).send({
          message: "Nenhuma peça de roupa encontrada com o ID fornecido."
        })
      }

      return clothing

    } catch (error) {
      console.error(error);
      response.send(error);
    }
  });
}
