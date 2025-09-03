import { MongodbService } from 'src/shared/services/mongodb.service'
import { CreateQuestionBodyType } from './question.model'
import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'

@Injectable()
export class QuestionRepo {
  constructor(private readonly mongoService: MongodbService) {}

  async create(body: CreateQuestionBodyType) {
    const data = body.map((item) => ({
      ...item,
      chap_id: new ObjectId(item.chap_id),
    }))
    const result = await this.mongoService.questionCollection.insertMany(data)
    const insertedIds = Object.values(result.insertedIds)
    return this.mongoService.questionCollection
      .find({
        _id: {
          $in: insertedIds,
        },
      })
      .toArray()
  }
}
