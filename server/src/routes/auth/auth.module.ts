import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthRepo } from './auth.repo'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepo],
})
export class AuthModule {}
