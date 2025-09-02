import { Injectable } from '@nestjs/common'
import { CreateQuestionBodyType } from './question.model'
import { QuestionRepo } from './question.repo'

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepo: QuestionRepo) {}

  create(body: CreateQuestionBodyType) {
    return this.questionRepo.create(body)
  }
}
