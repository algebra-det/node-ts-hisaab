import { SchemaDefinition } from 'mongoose'
import User, { UserDocument } from '../models/user.model'
import { omit } from 'lodash'
import ErrorResponse from '../responses/ErrorResponse'

export const createUser = async (input: SchemaDefinition<UserDocument>) => {
  const userAlreadyExists = await User.findOne({
    email: input.email
  })
  if (userAlreadyExists) {
    console.log('Already exists')
    throw new ErrorResponse(400, 'User already exists with this email')
  }
  console.log('moving ahead')
  const user = await User.create(input)
  return user
}

export const getNonAdminUsers = async () => {
  const users = await User.find({})
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
  return omit(user.toJSON(), 'password', '_v')
}
