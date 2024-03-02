import { NextFunction, Request, Response } from 'express'
import ErrorResponse from '../responses/ErrorResponse'

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user) throw new ErrorResponse(403, 'User not authorized')
  next()
}

export default requireUser
