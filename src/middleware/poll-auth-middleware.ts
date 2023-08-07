import { config } from 'dotenv'
import { FastifyReply, FastifyRequest } from 'fastify'

config()

export async function pollAuthMiddleware(
  req: FastifyRequest,
  res: FastifyReply,
) {
  if (req.method === 'GET') {
    return
  }

  const authToken = req.headers.authorization

  const secretToken = process.env.PERMISSION_TOKEN

  if (authToken !== secretToken) {
    res
      .status(403)
      .send(
        'Access Unauthorized. Please stop doing this, I have no resources for proper authentication.',
      )
  }
}
