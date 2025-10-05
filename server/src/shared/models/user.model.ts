import z from 'zod'
import { UserSchema } from './auth.model'

export const UpdateUserBodySchema = UserSchema.pick({
  age: true,
  name: true,
  role: true,
})
  .extend({
    email: z.string().trim().optional(),
  })
  .strict()

export const GetUserParamsSchema = z
  .object({
    userId: z.string(),
  })
  .strict()

export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>
export type GetUserParamsType = z.infer<typeof GetUserParamsSchema>
