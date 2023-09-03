import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/middleware/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
}
