import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SharedModule } from './shared/shared.module'
import { QuestionModule } from './routes/question/question.module'

@Module({
  imports: [SharedModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
