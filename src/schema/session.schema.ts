import z, { TypeOf } from 'zod'
import { createUserSchema } from '../schema/user.schema'

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Email should be valid'),
    password: z.string({
      required_error: 'Password is required'
    })
  }).strict()
})

export const signUpSchema = z.object({
  body: createUserSchema.shape.body.omit({
    role: true,
    active: true
  }).strict()
})

export type SignUpInput = TypeOf<typeof signUpSchema>
export type LoginInput = TypeOf<typeof loginSchema>
