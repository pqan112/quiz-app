import { ObjectId } from 'mongodb'
import z from 'zod'

export const QuestionSchema = z.object({
  _id: z.instanceof(ObjectId),
  options: z.array(z.string()),
  answer: z.string(),
  chap_id: z.string(), // chương
  image_url: z.string().nullable(),
  reason: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
})

export const GetQuestionParamsSchema = z
  .object({
    questionId: z.string(),
  })
  .strict()

export const GetQuestionDetailResSchema = QuestionSchema.extend({
  chap_id: z.instanceof(ObjectId),
})

export const GetQuestionsResSchema = z.object({
  data: z.array(GetQuestionDetailResSchema),
  total_items: z.number(),
  page: z.number(),
  limit: z.number(),
  total_pages: z.number(),
})

export const GetQuestionsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1), // coerce để chuyển từ string sang number
    limit: z.coerce.number().int().nonnegative().max(100).default(10), // nonnegative: >= 0 | max(100): <=100
  })
  .strict()

export const CreateQuestionsBodySchema = z.array(QuestionSchema.omit({ _id: true }).strict())
export const CreateQuestionsResSchema = z.array(GetQuestionDetailResSchema)

export const UpdateQuestionBodySchema = QuestionSchema.omit({ _id: true, created_at: true, updated_at: true }).strict()
export const UpdateQuestionParamsSchema = GetQuestionParamsSchema

export const DeleteQuestionParamsSchema = GetQuestionParamsSchema

export type CreateQuestionsBodyType = z.infer<typeof CreateQuestionsBodySchema>
export type CreateQuestionsResSchema = z.infer<typeof CreateQuestionsResSchema>

export type GetQuestionsQueryType = z.infer<typeof GetQuestionsQuerySchema>
export type GetQuestionParamsType = z.infer<typeof GetQuestionParamsSchema>
export type GetQuestionsResType = z.infer<typeof GetQuestionsResSchema>
export type GetQuestionDetailResType = z.infer<typeof GetQuestionDetailResSchema>

export type UpdateQuestionBodyType = z.infer<typeof UpdateQuestionBodySchema>
export type UpdateQuestionParamsType = z.infer<typeof UpdateQuestionParamsSchema>

export type DeleteQuestionParamsType = z.infer<typeof DeleteQuestionParamsSchema>
