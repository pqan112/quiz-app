import { Injectable } from '@nestjs/common'
import { MongodbService } from '../services/mongodb.service'

@Injectable()
export class SharedUserRepo {
  constructor(private readonly mongoService: MongodbService) {}

  findUserByEmail(email: string) {
    return this.mongoService.userCollection.findOne({
      email,
    })
  }
}
