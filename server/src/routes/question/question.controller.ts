import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateQuestionsBodyDTO, GetQuestionsQueryDTO } from './question.dto'
import { QuestionService } from './question.service'

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  list(@Query() query: GetQuestionsQueryDTO) {
    return this.questionService.list({
      page: query.page,
      limit: query.limit,
    })
  }

  @Post()
  create(@Body() body: CreateQuestionsBodyDTO) {
    return this.questionService.create(body)
  }
}
