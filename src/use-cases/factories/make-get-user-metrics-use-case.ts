import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  // Define database/model to use
  const checkInsRepository = new PrismaCheckInsRepository()
  // Run execution
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
