import { MongodbService } from 'src/shared/services/mongodb.service'
import {
  CreateQuestionsBodyType,
  DeleteQuestionParamsType,
  GetQuestionParamsType,
  GetQuestionsQueryType,
  UpdateQuestionBodyType,
  UpdateQuestionParamsType,
} from './question.model'
import { Injectable, NotFoundException } from '@nestjs/common'
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

  findById(params: GetQuestionParamsType) {
    const question = this.mongoService.questionCollection.findOne({
      _id: new ObjectId(params.questionId),
    })

    if (question === null) {
      throw new NotFoundException('error.question.not_found')
    }

    return question
  }

  async create(body: CreateQuestionsBodyType) {
    const now = new Date()
    const data = body.map((item) => ({
      ...item,
      chap_id: new ObjectId(item.chap_id),
      created_at: now,
      updated_at: now,
      deleted_at: null,
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

  updateById({ params, body }: { params: UpdateQuestionParamsType; body: UpdateQuestionBodyType }) {
    return this.mongoService.questionCollection.updateOne(
      {
        _id: new ObjectId(params.questionId),
      },
      {
        $set: {
          ...body,
          updated_at: new Date(),
        },
      },
    )
  }

  deleteById(params: DeleteQuestionParamsType, isHard?: boolean) {
    return isHard
      ? this.mongoService.questionCollection.deleteOne({ _id: new ObjectId(params.questionId) })
      : this.mongoService.questionCollection.updateOne(
          { _id: new ObjectId(params.questionId), deleted_at: null },
          {
            $set: {
              deleted_at: new Date(),
            },
          },
        )
  }
}
