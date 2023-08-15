import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  // Define database/model to use
  const usersRepository = new PrismaUsersRepository()
  // Run execution
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
