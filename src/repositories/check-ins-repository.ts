import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
  // The unchecked version is used by Prisma when your model already has the relationships established
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
