import { Body, Controller, Post } from '@nestjs/common'
import { CreateQuestionBodyDTO } from './question.dto'
import { QuestionService } from './question.service'

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() body: CreateQuestionBodyDTO) {
    return this.questionService.create(body)
  }
}
