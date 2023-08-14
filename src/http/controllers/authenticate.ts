import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  // Sanitise data
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    // Define database/model to use
    const usersRepository = new PrismaUsersRepository()
    // Run execution
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send()
    }

    throw err
  }

  return res.status(200).send()
}
