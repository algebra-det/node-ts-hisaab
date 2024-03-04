import { Request, Response } from 'express'
import { createUser, validateUser } from '../service/user.service'
import { LoginInput } from '../schema/session.schema'
import { CreateuserInput } from '../schema/user.schema'
import { signJwt, verifyJwt } from '../utils/jwt.utils'
import asyncHandler from '../utils/asyncHandler'
import ApiResponse from '../responses/ApiResponse'
import ErrorResponse from '../responses/ErrorResponse'
import { omit } from 'lodash'

export const loginHandler = asyncHandler(
  async (req: Request<{}, {}, LoginInput['body']>, res: Response) => {
    const user = await validateUser(req.body)
    if (!user) return res.json({ error: 'Invalid Username or Password' })
    const accessTokens = signJwt(user, 'access')
    console.log('Access: ', accessTokens)

    const refreshTokens = signJwt(user, 'refresh')
    console.log('Refresh: ', refreshTokens)

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

export const getUserData = asyncHandler(async (req: Request, res: Response) => {
  const user = res.locals.user
  return res.json(new ApiResponse({ user }))
})

export const renewAccessTokenFromRefresh = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken
  const { decoded } = verifyJwt(refreshToken, 'refresh')
  if (!decoded)
    throw new ErrorResponse(401, 'Refresh token not valid or is Expired')

  const accessTokens = signJwt(omit(decoded as object, 'iat', 'exp'), 'access')
  return res.json(new ApiResponse({ accessTokens }, 'Token refreshed'))
})
