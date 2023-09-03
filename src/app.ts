import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import { pollsRoutes } from './routes/polls'
import cookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(cookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// app.addHook('preHandler', async (req, res) => {
// Here I can assign a middleware that runs for any request
// })

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
app.register(pollsRoutes, {
  prefix: 'polls',
})
app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() })
  }

  if (env.DATABASE_URL !== 'production') {
    console.error(err)
  } else {
    // Ideally this is where we would log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: 'Internal server error.' })
})
