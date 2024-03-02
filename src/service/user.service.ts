import { SchemaDefinition } from 'mongoose'
import User, { UserDocument } from '../models/user.model'
import { omit } from 'lodash'
import ErrorResponse from '../responses/ErrorResponse'

export const createUser = async (input: SchemaDefinition<UserDocument>) => {
  const userAlreadyExists = await User.findOne({
    email: input.email
  }).lean()
  if (userAlreadyExists)
    throw new ErrorResponse(400, 'User already exists with this email')
  const user = await User.create(input)
  return omit(user.toJSON(), 'password', '__v')
}

export const getNonAdminUsers = async () => {
  const users = await User.find(
    { role: 'client' },
    { password: 0, __v: 0 }
  ).lean()
  return users
}

export const validateUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const user = await User.findOne({ email })

  if (!user) return false

  const isValid = await user.comparePassword(password)
  if (!isValid) return false
  return omit(user.toJSON(), 'password', '__v')
}
