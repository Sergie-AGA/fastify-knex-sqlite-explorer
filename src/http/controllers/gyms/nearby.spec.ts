import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Nearby Gyms (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => await app.close())

  it('should be able to search for gyms nearby', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '777',
        latitude: 53.404764,
        longitude: -2.981608,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some description',
        phone: '777',
        latitude: 55.404764,
        longitude: -1.981608,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: 53.404764, longitude: -2.981608 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ])
  })
})
