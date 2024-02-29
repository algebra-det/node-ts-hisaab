import { Express, Request, Response, NextFunction } from 'express'
import ErrorResponse from '../responses/ErrorResponse'
import logger from './logger'

const errorHandler = (app: Express) => {
  app.use(
    (
      error: ErrorResponse | Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      logger.error(error.message)
      let status = 500
      if (error instanceof ErrorResponse) {
        console.log('is ErrorResponse', error.message)
        status = error?.statusCode || 500
        return res.status(status).json({
          statusCode: status,
          data: error.data,
          message: error.message || 'Internal Server Error',
          success: false,
          errors: error.errors,
          stack: error.stack
        })
      }
      console.log('is Normal Error')
      return res.status(status).json({
        statusCode: status,
        data: null,
        message: error.message || 'Internal Server Error',
        success: false,
        errors: error,
        stack: error.stack
      })
    }
  )
}

export default errorHandler
