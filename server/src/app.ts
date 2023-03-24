import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'

import { schema } from './schema'

const server = new ApolloServer({
  schema
})

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL!)

async function startPlayground() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 9000 }
    })
    console.log('Playground ready at: ', url)
  } catch (err) {
    console.log('Error to up playground', err)
  }
}

if (process.env.NODE_ENV) {
  startPlayground()
}
