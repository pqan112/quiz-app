import { Global, Module } from '@nestjs/common'
import { MongodbService } from './services/mongodb.service'
import { MongodbModule } from 'src/mongodb/mongodb.module'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from './guards/access-token.guard'
import { HashingService } from './services/hashing.service'
import { SharedUserRepo } from './repo/shared-user.repo'

const sharedServices = [MongodbService, TokenService, HashingService, SharedUserRepo]

@Global()
@Module({
  providers: [
    ...sharedServices,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
  exports: sharedServices,
  imports: [MongodbModule, JwtModule],
})
export class SharedModule {}
