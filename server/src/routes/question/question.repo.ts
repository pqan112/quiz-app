import { MongodbService } from 'src/shared/services/mongodb.service'
import { CreateQuestionBodyType } from './question.model'
import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'

@Injectable()
export class QuestionRepo {
  constructor(private readonly mongoService: MongodbService) {}

  async create(body: CreateQuestionBodyType) {
    const result = await this.mongoService.questionCollection.insertOne(body)
    return this.mongoService.questionCollection.findOne({
      _id: result.insertedId,
    })
  }
}
