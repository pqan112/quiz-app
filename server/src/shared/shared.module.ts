import { Global, Module } from '@nestjs/common'
import { MongodbService } from './services/mongodb.service'
import { MongodbModule } from 'src/mongodb/mongodb.module'

const sharedServices = [MongodbService]

@Global()
@Module({
  providers: [...sharedServices],
  exports: sharedServices,
  imports: [MongodbModule],
})
export class SharedModule {}
