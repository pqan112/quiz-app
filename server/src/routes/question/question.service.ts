import { Injectable } from '@nestjs/common'
import {
  CreateQuestionsBodyType,
  DeleteQuestionParamsType,
  GetQuestionParamsType,
  GetQuestionsQueryType,
} from './question.model'
import { QuestionRepo } from './question.repo'

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepo: QuestionRepo) {}

  async list(pagination: GetQuestionsQueryType) {
    const data = await this.questionRepo.list({
      limit: pagination.limit,
      page: pagination.page,
    })

    return data
  }

  findById(params: GetQuestionParamsType) {
    return this.questionRepo.findById(params)
  }

  create(body: CreateQuestionsBodyType) {
    return this.questionRepo.create(body)
  }

  updateById({ params, body }) {
    return this.questionRepo.updateById({ params, body })
  }

  deleteById(params: DeleteQuestionParamsType) {
    return this.questionRepo.deleteById(params)
  }
}
