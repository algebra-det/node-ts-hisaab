import z, { TypeOf } from 'zod'
import { baseUserSchema } from '../schema/user.schema'

export const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required'
        })
        .email('Email should be valid'),
      password: z.string({
        required_error: 'Password is required'
      })
    })
    .strict()
})

export const signUpSchema = z.object({
  body: baseUserSchema
    .omit({
      role: true,
      active: true
    })
    .extend({
      confirmPassword: z
        .string({
          required_error: 'Confirm Password is required'
        })
        .trim()
        .min(6, 'Password too short, should be atleas 6 chars')
    })
    .strict()
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })
})

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string()
  })
})

export type SignUpInput = TypeOf<typeof signUpSchema>
export type LoginInput = TypeOf<typeof loginSchema>
