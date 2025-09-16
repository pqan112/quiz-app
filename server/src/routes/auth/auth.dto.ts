import { createZodDto } from 'nestjs-zod'
import { LoginBodySchema, RegisterBodySchema } from './auth.model'

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
