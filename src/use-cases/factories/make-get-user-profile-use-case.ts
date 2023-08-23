import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  // Define database/model to use
  const usersRepository = new PrismaUsersRepository()
  // Run execution
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
