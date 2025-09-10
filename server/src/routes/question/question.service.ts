import { Injectable } from '@nestjs/common'
import {
  CreateQuestionsBodyType,
  DeleteQuestionParamsType,
  GetQuestionParamsType,
  GetQuestionsQueryType,
} from './question.model'
import { QuestionRepo } from './question.repo'
import { DeleteSuccessfully, UpdateSuccessfully } from './question.message'

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

  async updateById({ params, body }) {
    await this.questionRepo.updateById({ params, body })
    return {
      message: DeleteSuccessfully,
    }
  }

  async deleteById(params: DeleteQuestionParamsType) {
    await this.questionRepo.deleteById(params)
    return {
      message: UpdateSuccessfully,
    }
  }
}
