import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  // Define database/model to use
  const gymsRepository = new PrismaGymsRepository()
  // Run execution
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
