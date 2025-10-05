import { createZodDto } from 'nestjs-zod'
import { GetUserParamsSchema, UpdateUserBodySchema } from '../models/user.model'

export class UpdateUserBodyDTO extends createZodDto(UpdateUserBodySchema) {}

export class GetUserParamsDTO extends createZodDto(GetUserParamsSchema) {}
