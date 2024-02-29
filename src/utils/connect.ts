import mongoose from 'mongoose'
import config from 'config'
import logger from '../utils/logger'

const connect = async () => {
  try {
    const dbUri = config.get<string>('dbUri')
    await mongoose.connect(dbUri)
    logger.info('Connected to DB')
  } catch (error: any) {
    logger.error(`Could not connect to DB: ${error.message}`)
    process.exit(1)
  }
}

export default connect
