import { Module } from '@nestjs/common'
import { QuestionController } from './question.controller'
import { QuestionRepo } from './question.repo'
import { QuestionService } from './question.service'

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepo],
})
export class QuestionModule {}
