import { NextFunction, Request, Response } from 'express'
import { createUser, validateUser } from '../service/user.service'
import { LoginInput } from '../schema/session.schema'
import { CreateuserInput } from '../schema/user.schema'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'
import asyncHandler from '../utils/asyncHandler'
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
        { user: user, tokens: { accessTokens, refreshTokens } },
        'login successfull'
      )
    )
  }
)

export const signUpHandler = asyncHandler(
  async (req: Request<{}, {}, CreateuserInput['body']>, res: Response) => {
    const user = await createUser(req.body)
    return res.json(new ApiResponse({ user }, 'SignUp successfull', 201))
  }
)

export const getUserData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    return res.json(new ApiResponse({ user }))
  }
)
