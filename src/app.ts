import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import { pollsRoutes } from './routes/polls'
import cookie from '@fastify/cookie'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.register(cookie)

// app.addHook('preHandler', async (req, res) => {
// Here I can assign a middleware that runs for any request
// })

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
app.register(pollsRoutes, {
  prefix: 'polls',
})
app.post('/users', async (req, res) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return res.status(201).send()
})
