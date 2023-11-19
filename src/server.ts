import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'

import { getAllClothingRoute } from './routes/clothings/get-all-clothings'
import { createClothingRoute } from './routes/clothings/create-clothing'
import { uploadImagesRoute } from './routes/clothings/upload-images'
import { getAllSizesRoute } from './routes/sizes/get-all-sizes'
import { searchClothingRoute } from './routes/clothings/search-clothing-by-name'
import { searchClothingById } from './routes/clothings/search-clothing-by-id'
import { getClothingById } from './routes/clothings/get-clothing-by-id'

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})
app.register(fastifyMultipart)

app.register(getAllClothingRoute)
app.register(createClothingRoute)
app.register(uploadImagesRoute)
app.register(getAllSizesRoute)
app.register(searchClothingRoute)
app.register(searchClothingById)
app.register(getClothingById)

app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then(() => {
  console.log('HTTP Server Running...')
})