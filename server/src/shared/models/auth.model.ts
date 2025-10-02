import { ObjectId } from 'mongodb'
import z from 'zod'
import { UserRole } from '../constants/auth.constant'

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId),
  email: z.email().trim(),
  password: z.string().trim(),
  name: z.string().trim().optional(),
  age: z.coerce.number().int().positive().optional(),
  role: z.enum(UserRole).default(UserRole.TEACHER),
  refresh_token: z.string(),
  rft_expires_at: z.date().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
})
