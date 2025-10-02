import { createZodDto } from 'nestjs-zod'
import { UpdateUserBodySchema } from './user.model'

export class UpdateUserBodyDTO extends createZodDto(UpdateUserBodySchema) {}
