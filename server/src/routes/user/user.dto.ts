import { createZodDto } from 'nestjs-zod'
import { GetUserParamsSchema, UpdateUserBodySchema } from './user.model'

export class UpdateUserBodyDTO extends createZodDto(UpdateUserBodySchema) {}

export class GetUserParamsDTO extends createZodDto(GetUserParamsSchema) {}
