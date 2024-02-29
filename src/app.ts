import express from 'express'
import helmet from 'helmet'
import config from 'config'
import dotenv from "dotenv";
dotenv.config();

import connect from './utils/connect'
import logger from './utils/logger'

import routes from './routes'
import errorHandler from './utils/errorHandler'

const port = config.get<number>('port')

const app = express()

app.use(helmet())
app.use(express.json())

process.on('SIGINT', async () => {
  try {
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})

app.listen(port, () => {
  logger.info(`Application listening at : http://localhost:${port}`)
  connect()
  routes(app)
  app.use('*', (_req, res) => {
    throw new Error('No route found')
  })
  errorHandler(app)
})
