import { Inject, Injectable } from '@nestjs/common'
import { Collection, Db } from 'mongodb'
import envConfig from '../config'

@Injectable()
export class MongodbService {
  constructor(
    @Inject('MONGO_DB')
    private readonly db: Db,
  ) {}

  get questionCollection(): Collection {
    return this.db.collection(envConfig.QUESTION_COLLECTION)
  }

  get userCollection(): Collection {
    return this.db.collection(envConfig.USER_COLLECTION)
  }
}
