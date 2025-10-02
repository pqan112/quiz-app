import { UserSchema } from 'src/shared/models/auth.model'
import z from 'zod'

export const UpdateUserBodySchema = UserSchema.pick({
  age: true,
  name: true,
  role: true,
  email: true,
  password: true,
}).strict()

export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>
