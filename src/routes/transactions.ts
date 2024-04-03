import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function transactionsRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return { transactions }
  })

  server.get('/:id', async (request) => {
    const getTransactionsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionsSchema.parse(request.params)

    const transactions = await knex('transactions').where('id', id).first()

    return transactions
  })

  server.post('/', async (request, reply) => {
    const createTransactionSchema = z.object({
      tittle: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { tittle, amount, type } = createTransactionSchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      tittle,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
