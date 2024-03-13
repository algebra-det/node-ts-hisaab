import { Request, Response } from 'express'
import { createUser, getNonAdminUsers } from '../service/user.service'
import { CreateuserInput } from '../schema/user.schema'
import asyncHandler from '../utils/asyncHandler'
import ApiResponse from '../responses/ApiResponse'

export const createUserHandler = asyncHandler(
  async (req: Request<{}, {}, CreateuserInput['body']>, res: Response) => {
    const user = await createUser(req.body)
    return res.json(new ApiResponse({ user }, 'User created successfully', 201))
  }
)

export const getAllNonAdminUsersHandler = asyncHandler(
  async (_: Request, res: Response) => {
    const users = await getNonAdminUsers()
    return res.json(new ApiResponse({ users }))
  }
)
