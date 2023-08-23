import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  // Define database/model to use
  const gymsRepository = new PrismaGymsRepository()
  // Run execution
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
