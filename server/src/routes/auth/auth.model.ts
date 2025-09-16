import { ObjectId } from 'mongodb'
import z from 'zod'
import { InvalidEmail } from './auth.message'
import { UserRole } from 'src/shared/constants/auth.constant'

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId),
  email: z.email(InvalidEmail).trim(),
  password: z.string().trim(),
  name: z.string().trim(),
  age: z.coerce.number().int().positive(),
  role: z.enum(UserRole).default(UserRole.TEACHER),
  refresh_token: z.string(),
  rft_expires_at: z.date().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
})

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).strict()

export const LoginBodySchema = RegisterBodySchema

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type LoginBodyType = z.infer<typeof LoginBodySchema>
