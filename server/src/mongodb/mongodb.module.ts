import { Module } from '@nestjs/common'
import { MongoClient } from 'mongodb'
import envConfig from 'src/shared/config'

const uri = `mongodb+srv://${envConfig.DB_USERNAME}:${envConfig.DB_PASSWORD}@quiz.nqdmzmx.mongodb.net/?retryWrites=true&w=majority&appName=${envConfig.DB_NAME}`
const client = new MongoClient(uri)

@Module({
  providers: [
    {
      provide: 'MONGO_DB',
      useFactory: async () => {
        await client.connect()
        return client.db()
      },
    },
  ],
  exports: ['MONGO_DB'],
})
export class MongodbModule {}
