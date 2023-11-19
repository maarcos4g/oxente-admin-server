import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function getAllSizesRoute(app: FastifyInstance) {

  app.get('/sizes', async (request, response) => {
    try {
      const sizes = await prisma.size.findMany()

      return sizes
    } catch (error) {
      console.error(error)
      response.send(error)
    }
  })
}