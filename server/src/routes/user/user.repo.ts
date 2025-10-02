import { Injectable } from '@nestjs/common'
import { MongodbService } from 'src/shared/services/mongodb.service'
import { UpdateUserBodyType } from './user.model'
import { ObjectId } from 'mongodb'

@Injectable()
export class UserRepo {
  constructor(private readonly mongoService: MongodbService) {}

  async update(userId: string, body: UpdateUserBodyType) {
    return this.mongoService.userCollection.updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          ...body,
          updated_at: new Date(),
        },
      },
    )
  }
}
