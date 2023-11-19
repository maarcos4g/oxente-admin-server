import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function searchClothingRoute(app: FastifyInstance) {

  app.get('/clothing/search', async (request, response) => {
    try {
      const getClothingBody = z.object({
        title: z.string().optional(),
      });

      const { title } = getClothingBody.parse(request.query);

      const clothing = await prisma.clothing.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });

      if (clothing.length === 0) {
        return response.status(404).send({
          message: "Nenhuma peça de roupa encontrada com o título fornecido.",
        });
      }

      return clothing;
    } catch (error) {
      console.error(error);
      response.send(error);
    }
  });
}
