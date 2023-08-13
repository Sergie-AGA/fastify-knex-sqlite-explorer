import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import { pollsRoutes } from './routes/polls'
import cookie from '@fastify/cookie'
import { appRoutes } from './http/routes'

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
app.register(appRoutes)
