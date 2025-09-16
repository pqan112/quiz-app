import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongodb'
import { MongodbService } from 'src/shared/services/mongodb.service'

@Injectable()
export class AuthRepo {
  constructor(private readonly mongoService: MongodbService) {}

  findUserByEmail(email: string) {
    return this.mongoService.userCollection.findOne({
      email,
    })
  }

  register({ email, password }: { email: string; password: string }) {
    return this.mongoService.userCollection.insertOne({
      email,
      password,
    })
  }

  updateUserById({
    user_id,
    refresh_token,
    rft_expires_at,
  }: {
    user_id: string
    refresh_token: string
    rft_expires_at: Date
  }) {
    return this.mongoService.userCollection.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          refresh_token,
          rft_expires_at,
        },
      },
    )
  }
}
