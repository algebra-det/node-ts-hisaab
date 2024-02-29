import { Request, Response } from 'express'
import { createUser, getNonAdminUsers } from '../service/user.service'
import {
  CreateuserInput,
  getUserSchema,
  listUserSchema
} from '../schema/user.schema'
import asyncHandler from '../utils/asyncHandler'

export const createUserHandler = asyncHandler(
  async (req: Request<{}, {}, CreateuserInput['body']>, res: Response) => {
    const user = await createUser(req.body)
    const parsedUser = getUserSchema.parse(user)
    return res.json({ data: parsedUser })
  }
)

export const getAllNonAdminUsersHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const usersObj = await getNonAdminUsers()
    const users = listUserSchema.parse(usersObj)
    return res.json({ data: users })
  }
)
