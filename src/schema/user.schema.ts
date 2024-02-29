import z, { TypeOf } from 'zod'

const baseUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(4),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email('Email should be valid')
})
export const createUserSchema = z.object({
  body: baseUserSchema.extend({
    role: z.enum(['admin', 'client']).optional(),
    active: z.boolean().optional(),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(6, 'Password too short, should be atleas 6 chars'),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required'
      })
      .min(6, 'Password too short, should be atleas 6 chars')
  }).strict()
})

export const getUserSchema = baseUserSchema.extend({
  role: z.enum(['admin', 'client']),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const listUserSchema = z.array(getUserSchema)
// export const createUserSchema = z.object({
//   body: z
//     .object({
//       name: z
//         .string({
//           required_error: 'Name is required'
//         })
//         .min(4),
//       email: z
//         .string({
//           required_error: 'Email is required'
//         })
//         .email('Email should be valid'),
//       password: z
//         .string({
//           required_error: 'Password is required'
//         })
//         .min(6, 'Password too short, should be atleas 6 chars'),
//       confirmPassword: z
//         .string({
//           required_error: 'Confirm Password is required'
//         })
//         .min(6, 'Password too short, should be atleas 6 chars')
//     })
//     .refine(data => data.password === data.confirmPassword, {
//       message: 'Password and Confirm Passwords should match.',
//       path: ['confirmPassword']
//     })
// })

export type CreateuserInput = TypeOf<typeof createUserSchema>