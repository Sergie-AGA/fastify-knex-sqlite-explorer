import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase()

  //   await authenticateUseCase.execute({ email, password })
  // } catch (err) {
  //   if (err instanceof InvalidCredentialsError) {
  //     return res.status(400).send()
  //   }

  //   throw err
  // }

  return res.status(200).send()
}
