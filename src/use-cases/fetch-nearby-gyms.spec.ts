import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository) // System Under Test (SUT) is a pattern used in the testing community so you don't change names multiple times as you create your tests
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Away Gym',
      description: null,
      phone: null,
      latitude: 56.404764,
      longitude: -2.981608,
    })
    await gymsRepository.create({
      title: 'Nearby Gym',
      description: null,
      phone: null,
      latitude: 52.404764,
      longitude: -1.981608,
    })

    const { gyms } = await sut.execute({
      userLatitude: 52.404765,
      userLongitude: -1.981609,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })])
  })
})
