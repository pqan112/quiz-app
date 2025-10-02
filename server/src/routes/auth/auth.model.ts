import { UserSchema } from 'src/shared/models/auth.model'
import z from 'zod'

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).strict()

export const LoginBodySchema = RegisterBodySchema

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type LoginBodyType = z.infer<typeof LoginBodySchema>
