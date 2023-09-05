import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => await app.close())

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '777',
        latitude: 53.404764,
        longitude: -2.981608,
      })

    expect(response.statusCode).toEqual(201)
  })
})
