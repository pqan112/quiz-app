import { createZodDto } from 'nestjs-zod'
import {
  CreateQuestionsBodySchema,
  CreateQuestionsResSchema,
  GetQuestionsQuerySchema,
  GetQuestionsResSchema,
} from './question.model'

export class CreateQuestionsBodyDTO extends createZodDto(CreateQuestionsBodySchema) {}
export class CreateQuestionsResDTO extends createZodDto(CreateQuestionsResSchema) {}

export class GetQuestionsQueryDTO extends createZodDto(GetQuestionsQuerySchema) {}
export class GetQuestionsResDTO extends createZodDto(GetQuestionsResSchema) {}
