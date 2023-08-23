import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeChekInUseCase() {
  // Define database/model to use
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  // Run execution
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
