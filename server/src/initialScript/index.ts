import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { ObjectId } from 'mongodb'
import { MongodbService } from 'src/shared/services/mongodb.service'
import { CreateQuestionsBodySchema } from 'src/routes/question/question.model'

async function seedInitialData() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const mongodbService = app.get(MongodbService)

  const questions = [
    {
      options: ['Paris', 'London', 'Berlin'],
      answer: 'Paris',
      chap_id: new ObjectId(),
      image_url: null,
      reason: 'Paris is the capital of France.',
    },
    {
      options: ['2', '3', '4'],
      answer: '4',
      chap_id: new ObjectId(),
      image_url: null,
      reason: 'Basic math: 2 + 2 = 4.',
    },
  ]

  // Validate + add timestamps
  const now = new Date()
  const validatedQuestions = questions.map((q) => {
    const parsed = CreateQuestionsBodySchema.parse(q)
    return {
      ...parsed,
      created_at: now,
      updated_at: now,
    }
  })

  const result = await mongodbService.questionCollection.insertMany(validatedQuestions)
  console.log(`✅ Seeded ${result.insertedCount} questions.`)

  await app.close()
}

seedInitialData().catch((err) => {
  console.error('❌ Seeding failed:', err)
})
