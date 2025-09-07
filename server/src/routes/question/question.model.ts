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
})

export const GetQuestionsResDetail = QuestionSchema.extend({
  chap_id: z.instanceof(ObjectId),
})

export const GetQuestionsResSchema = z.object({
  data: z.array(GetQuestionsResDetail),
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
export const CreateQuestionsResSchema = z.array(GetQuestionsResDetail)

export type CreateQuestionsBodyType = z.infer<typeof CreateQuestionsBodySchema>
export type CreateQuestionsResSchema = z.infer<typeof CreateQuestionsResSchema>
export type GetQuestionsQueryType = z.infer<typeof GetQuestionsQuerySchema>
export type GetQuestionsResType = z.infer<typeof GetQuestionsResSchema>
