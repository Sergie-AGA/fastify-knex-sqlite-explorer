import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createtransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createtransactionBodySchema.parse(req.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return res.status(201).send('Transaction created successfully')
  })
}
