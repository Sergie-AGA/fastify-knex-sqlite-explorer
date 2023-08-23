import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  // Define database/model to use
  const checkInsRepository = new PrismaCheckInsRepository()
  // Run execution
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
