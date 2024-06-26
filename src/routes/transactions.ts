import { checkSessionIdExists } from '../middlewares/check-sessionid-exists'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { knex } from '../database'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return { transactions }
  })

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionSchema = z.object({
      tittle: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { tittle, amount, type } = createTransactionSchema.parse(request.body)

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      tittle,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
