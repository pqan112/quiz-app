import { createZodDto } from 'nestjs-zod'
import {
  CreateQuestionsBodySchema,
  CreateQuestionsResSchema,
  DeleteQuestionParamsSchema,
  GetQuestionDetailResSchema,
  GetQuestionParamsSchema,
  GetQuestionsQuerySchema,
  GetQuestionsResSchema,
  UpdateQuestionBodySchema,
  UpdateQuestionParamsSchema,
} from './question.model'

export class CreateQuestionsBodyDTO extends createZodDto(CreateQuestionsBodySchema) {}
export class CreateQuestionsResDTO extends createZodDto(CreateQuestionsResSchema) {}

export class GetQuestionsQueryDTO extends createZodDto(GetQuestionsQuerySchema) {}
export class GetQuestionsResDTO extends createZodDto(GetQuestionsResSchema) {}
export class GetQuestionParamsDTO extends createZodDto(GetQuestionParamsSchema) {}
export class GetQuestionDetailResDTO extends createZodDto(GetQuestionDetailResSchema) {}

export class UpdateQuestionBodyDTO extends createZodDto(UpdateQuestionBodySchema) {}
export class UpdateQuestionParamsDTO extends createZodDto(UpdateQuestionParamsSchema) {}

export class DeleteQuestionParamsDTO extends createZodDto(DeleteQuestionParamsSchema) {}
