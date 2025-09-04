import { Injectable } from '@nestjs/common'
import { CreateQuestionsBodyType, GetQuestionsQueryType } from './question.model'
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

  create(body: CreateQuestionsBodyType) {
    return this.questionRepo.create(body)
  }
}
