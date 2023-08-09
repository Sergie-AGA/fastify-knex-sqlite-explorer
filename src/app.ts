import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { transactionsRoutes } from './routes/transactions'
import { pollsRoutes } from './routes/polls'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

const prisma = new PrismaClient()

// app.addHook('preHandler', async (req, res) => {
// Here I can assign a middleware that runs for any request
// })

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
app.register(pollsRoutes, {
  prefix: 'polls',
})
