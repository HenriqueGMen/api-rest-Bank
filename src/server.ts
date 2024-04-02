import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const server = fastify()

server.get('/home', async () => {
  const transactions = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      tittle: 'Transactions teste',
      amount: 1000,
    })
    .returning('*')

  return transactions
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running')
  })
