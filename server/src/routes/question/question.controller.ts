import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { CreateQuestionsBodyDTO, CreateQuestionsResDTO, GetQuestionsQueryDTO, GetQuestionsResDTO } from './question.dto'
import { QuestionService } from './question.service'
import { ZodSerializerDto } from 'nestjs-zod'

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ZodSerializerDto(GetQuestionsResDTO)
  @HttpCode(HttpStatus.OK)
  list(@Query() query: GetQuestionsQueryDTO) {
    return this.questionService.list({
      page: query.page,
      limit: query.limit,
    })
  }

  @Post()
  @ZodSerializerDto(CreateQuestionsResDTO)
  create(@Body() body: CreateQuestionsBodyDTO) {
    return this.questionService.create(body)
  }
}
