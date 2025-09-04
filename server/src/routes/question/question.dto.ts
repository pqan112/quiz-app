import { createZodDto } from 'nestjs-zod'
import { CreateQuestionsBodySchema, GetQuestionsQuerySchema } from './question.model'

export class CreateQuestionsBodyDTO extends createZodDto(CreateQuestionsBodySchema) {}

export class GetQuestionsQueryDTO extends createZodDto(GetQuestionsQuerySchema) {}
