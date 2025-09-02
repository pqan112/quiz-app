import { ObjectId } from 'mongodb'
import z from 'zod'

export const QuestionSchema = z.object({
  _id: z.instanceof(ObjectId),
  options: z.array(z.string()),
  answer: z.string(),
  chap_id: z.instanceof(ObjectId), // chương
  image_url: z.string().nullable(),
  reason: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export const GetQuestionSchema = QuestionSchema

export const CreateQuestionSchema = QuestionSchema.omit({ _id: true }).strict()
