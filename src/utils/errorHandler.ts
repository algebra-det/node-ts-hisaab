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
        status = error?.statusCode || 500
        const response = {
          statusCode: status,
          data: error.data,
          message: error.message || 'Internal Server Error',
          success: false,
          errors: error.errors,
          stack: status === 500 ? error.stack : ''
        }
        return res.status(status).json(response)
      }
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
