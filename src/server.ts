import fastify from "fastify";

const server = fastify();

server.get('/home', () => {
  return "Hello world"
})

server.listen({
  port:3333
}).then(() => {
  console.log("Server is running")
})