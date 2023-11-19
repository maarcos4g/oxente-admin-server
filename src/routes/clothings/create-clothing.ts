import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import ShortUniqueId from 'short-unique-id';
import { z } from "zod";

export async function createClothingRoute(app: FastifyInstance) {
  app.post('/clothing/create', async (request, response) => {
    try {
      const createClothingBody = z.object({
        title: z.string().nonempty(),
        price: z.number().nonnegative(),
        isParcel: z.boolean(),
        numberOfParcels: z.string().optional(),
        parcelValue: z.number().optional(),
        colors: z.array(
          z.object({
            color: z.string().nonempty(),
          })
        ).nonempty(),
        sizeIds: z.array(
          z.string().cuid().nonempty()
        )
      })

      const { isParcel, price, title, numberOfParcels, parcelValue, colors, sizeIds } = createClothingBody.parse(request.body)

      const generate = new ShortUniqueId({ length: 8 })
      const clothingId = `OX${generate()}`.toUpperCase()

      const clothing = await prisma.clothing.create({
        data: {
          title,
          price,
          isParcel,
          parcelValue,
          numberOfParcel: numberOfParcels,
          clothingId,
          colors: {
            create: colors.map(color => ({ color: color.color }))
          },
        }
      })

      for (const sizeId of sizeIds) {
        await prisma.clothingSize.create({
          data: {
            clothingId: clothing.id,
            sizeId,
          },
        });
      }

      return {
        clothing,
      }

    } catch (error) {
      response.send(error)
    }
  })
}