import { Injectable } from '@nestjs/common'
import { MongodbService } from '../services/mongodb.service'
import { ObjectId } from 'mongodb'
import { UpdateUserBodyType } from '../models/user.model'

@Injectable()
export class SharedUserRepo {
  constructor(private readonly mongoService: MongodbService) {}

  findUserById(id: string) {
    return this.mongoService.userCollection.findOne({
      _id: new ObjectId(id),
    })
  }

  findUserByEmail(email: string) {
    return this.mongoService.userCollection.findOne({
      email,
    })
  }

  updateUserById(userId: string, body: UpdateUserBodyType) {
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
