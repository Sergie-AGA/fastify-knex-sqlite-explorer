import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

// app.get('/allTables', async () => {
//   const tables = await knex('sqlite_schema').select('*')

//   return tables
// })

app.listen({ port: env.PORT }).then(() => console.log('Server Running'))
