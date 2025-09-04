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

export const GetQuestionSchema = z.object({
  data: z.array(QuestionSchema),
  total_items: z.number(),
  page: z.number(),
  limit: z.number(),
  total_pages: z.number(),
})

export const GetQuestionsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1), // coerce để chuyển từ string sang number
    limit: z.coerce.number().int().positive().default(10),
  })
  .strict()

export const CreateQuestionsBodySchema = z.array(QuestionSchema.omit({ _id: true }).strict())

export type CreateQuestionsBodyType = z.infer<typeof CreateQuestionsBodySchema>
export type GetQuestionsQueryType = z.infer<typeof GetQuestionsQuerySchema>
