import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SharedUserRepo } from 'src/shared/repo/shared-user.repo'

@Module({
  controllers: [UserController],
  providers: [UserService, SharedUserRepo],
})
export class UserModule {}
