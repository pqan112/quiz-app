import { MongodbService } from 'src/shared/services/mongodb.service'
import {
  CreateQuestionsBodyType,
  DeleteQuestionParamsType,
  GetQuestionParamsType,
  GetQuestionsQueryType,
  UpdateQuestionBodyType,
  UpdateQuestionParamsType,
} from './auth.model'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ObjectId } from 'mongodb'

@Injectable()
export class AuthRepo {
  constructor(private readonly mongoService: MongodbService) {}
}
