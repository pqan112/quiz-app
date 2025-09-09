import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common'
import {
  CreateQuestionsBodyDTO,
  CreateQuestionsResDTO,
  DeleteQuestionParamsDTO,
  GetQuestionParamsDTO,
  GetQuestionsQueryDTO,
  GetQuestionsResDTO,
  UpdateQuestionBodyDTO,
  UpdateQuestionParamsDTO,
} from './question.dto'
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

  @Get(':questionId')
  findById(@Param() params: GetQuestionParamsDTO) {
    return this.questionService.findById(params)
  }

  @Post()
  @ZodSerializerDto(CreateQuestionsResDTO)
  create(@Body() body: CreateQuestionsBodyDTO) {
    return this.questionService.create(body)
  }

  @Put(':questionId')
  updateById(@Param() params: UpdateQuestionParamsDTO, @Body() body: UpdateQuestionBodyDTO) {
    return this.questionService.updateById({ params, body })
  }

  @Delete(':questionId')
  deleteById(@Param() params: DeleteQuestionParamsDTO) {
    return this.questionService.deleteById(params)
  }
}
