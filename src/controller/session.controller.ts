import { NextFunction, Request, Response } from 'express'
import { createUser, validateUser } from '../service/user.service'
import { LoginInput } from '../schema/session.schema'
import { CreateuserInput, getUserSchema } from '../schema/user.schema'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'
import asyncHandler from '../utils/asyncHandler'
import ErrorResponse from '../responses/ErrorResponse'
import ApiResponse from '../responses/ApiResponse'

export const loginHandler = asyncHandler(
  async (req: Request<{}, {}, LoginInput['body']>, res: Response) => {
    const user = await validateUser(req.body)
    if (!user) return res.json({ error: 'Invalid Username or Password' })
    const accessTokens = signJwt(user, {
      expiresIn: config.get<string>('accessTokenTtl')
    })
    const refreshTokens = signJwt(user, {
      expiresIn: config.get<string>('refreshTokenTtl')
    })
    return res.json(
      new ApiResponse(
        { data: user, tokens: { accessTokens, refreshTokens } },
        'login successfull'
      )
    )
  }
)

export const signUpHandler = asyncHandler(
  async (req: Request<{}, {}, CreateuserInput['body']>, res: Response) => {
    const user = await createUser(req.body)
    const parsedUser = getUserSchema.parse(user)
    return res.json(new ApiResponse(parsedUser))
  }
)

export const testingHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new ErrorResponse(400, 'hello brother')
  }
)
