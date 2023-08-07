import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { pollAuthMiddleware } from '../middleware/poll-auth-middleware'

export async function pollsRoutes(app: FastifyInstance) {
  // Middleware
  app.addHook('preHandler', async (req, res) => {
    // pollAuthMiddleware(req, res)
  })

  // Create Poll
  app.post('/', async (req, res) => {
    const optionSchema = z.object({
      option: z.string().nullable(),
      votes: z.number().default(0),
    })

    const createPollBodySchema = z.object({
      title: z.string(),
      image: z.string().nullable().default(''),
      optionsData: z.array(optionSchema).default([]),
    })

    const { title, image, optionsData } = createPollBodySchema.parse(req.body)

    await knex('polls')
      .insert({
        id: randomUUID(),
        title,
        image,
        optionsData,
      })
      .returning('*')

    return res.status(201).send('Poll created successfully')
  })

  // Get all Polls
  app.get('/', async (req, res) => {
    const polls = await knex('polls').select()

    return { polls }
  })

  // Get specific poll
  app.get('/:id', async (req, res) => {
    const getPollParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getPollParamsSchema.parse(req.params)

    const poll = await knex('polls')
      .where({
        id,
      })
      .first()

    if (!poll) {
      res.code(404).send({ error: 'Poll not found' })
      return
    }

    return { poll }
  })

  app.get('/summary', async (req) => {
    const { sessionId } = req.cookies

    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .where('session_id', sessionId)
      .first()

    return { summary }
  })
}
