import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function getAllClothingRoute(app: FastifyInstance) {
  app.get('/clothings', async (request, response) => {
    try {
      const paginationBody = z.object({
        limit: z.string().nonempty(),
        offSet: z.string().nonempty(),
      });
  
      const { limit, offSet } = paginationBody.parse(request.query);

      const total = await prisma.clothing.count();
  
      const clothings = await prisma.clothing.findMany({
        take: Number(limit),
        skip: Number(offSet) * Number(limit),
        orderBy: {
          // price: "asc",
          title: "asc"
        },
      });
  
      return {
        total,
        count: clothings.length,
        clothings,
      };
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  });
}
