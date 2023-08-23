import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  // Define database/model to use
  const gymsRepository = new PrismaGymsRepository()
  // Run execution
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
