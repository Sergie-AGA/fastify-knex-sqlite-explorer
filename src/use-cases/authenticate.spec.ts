import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository) // System Under Test (SUT) is a pattern used in the testing community so you don't change names multiple times as you create your tests
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john.doe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with the wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john.doe@gmail.comm',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with the wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'john.doe@gmail.comm',
        password: '1234526',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
