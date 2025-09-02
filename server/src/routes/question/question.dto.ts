import { createZodDto } from 'nestjs-zod'
import { CreateQuestionBodySchema } from './question.model'

export class CreateQuestionBodyDTO extends createZodDto(CreateQuestionBodySchema) {}
