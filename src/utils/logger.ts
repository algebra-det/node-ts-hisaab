import pino from 'pino'
import PinoPretty from 'pino-pretty'
import dayjs from 'dayjs'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true
    }
  }
})
// const logger = pino({
//   transport: {
//     target: 'pino-pretty',
//     options: {
//       colorize: true
//     }
//   },
//   base: {
//     pid: true
//   },
//   timestamp: () => `,"time":"${dayjs().format()}`
// })

export default logger
