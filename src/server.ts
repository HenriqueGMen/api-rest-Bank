import fastify from 'fastify'
import { knex } from './database'

const server = fastify()

server.get('/home', async () => {
  const table = await knex('sqlite_schema').select('*')

  return table
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running')
  })
