import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from './env.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomRoute } from './http/routes/create-room.ts';
import { getRoomsQuestions } from './http/routes/get-room-questions.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: 'http://localhost:5173', // Permite requisições do frontend em especifico dessa URL
})

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
    return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomsQuestions)
app.register(createQuestionRoute)

app.listen({port: env.PORT}).then(() => {
  console.log('HTTP Server running!!!')
})