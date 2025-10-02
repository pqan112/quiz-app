import { Injectable } from '@nestjs/common'
import { MongodbService } from '../services/mongodb.service'
import { ObjectId } from 'mongodb'

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
}
