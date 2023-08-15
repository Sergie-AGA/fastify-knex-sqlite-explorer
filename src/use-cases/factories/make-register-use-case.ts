// This file implements the factory pattern
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  // Define database/model to use
  const usersRepository = new PrismaUsersRepository()
  // Run execution
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
