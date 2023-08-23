import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  // Define database/model to use
  const checkInsRepository = new PrismaCheckInsRepository()
  // Run execution
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
