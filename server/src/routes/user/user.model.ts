import { UserSchema } from 'src/shared/models/auth.model'
import z from 'zod'

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
