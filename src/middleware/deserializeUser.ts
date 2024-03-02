import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import { verifyJwt } from '../utils/jwt.utils'

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessTokens = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )
  
  if (!accessTokens) return next()

  const { decoded } = verifyJwt(accessTokens)
  console.log('token: ', accessTokens, decoded);
  if (decoded) {
    res.locals.user = decoded
  }
   next()
}

export default deserializeUser