import { Module } from '@nestjs/common'
import { MeController } from './me.controller'
import { MeService } from './me.service'
import { SharedUserRepo } from 'src/shared/repo/shared-user.repo'

@Module({
  controllers: [MeController],
  providers: [MeService, SharedUserRepo],
})
export class MeModule {}
