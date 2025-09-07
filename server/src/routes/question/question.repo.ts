import { MongodbService } from 'src/shared/services/mongodb.service'
import { CreateQuestionsBodyType, GetQuestionsQueryType } from './question.model'
import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'

@Injectable()
export class QuestionRepo {
  constructor(private readonly mongoService: MongodbService) {}

  async list(pagination: GetQuestionsQueryType) {
    const skip = (pagination.page - 1) * pagination.limit
    const limit = pagination.limit
    const [data, total_items] = await Promise.all([
      this.mongoService.questionCollection.find().skip(skip).limit(limit).toArray(),
      this.mongoService.questionCollection.countDocuments(),
    ])

    return {
      data,
      total_items,
      page: pagination.page,
      limit: limit,
      total_pages: limit === 0 ? 1 : Math.ceil(total_items / limit),
    }
  }

  async create(body: CreateQuestionsBodyType) {
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
