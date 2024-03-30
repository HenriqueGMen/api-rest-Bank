import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

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
    port: 3333,
  })
  .then(() => {
    console.log('Server is running')
  })
