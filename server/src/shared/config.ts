import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'
import { z } from 'zod'

config({
  path: '.env',
})

// Kiểm tra coi thử có file .env hay chưa
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env')
  process.exit(1)
}

const configSchema = z.object({
  PORT: z.string(),
  APP_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  QUESTION_COLLECTION: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
})

// enableImplicitConversion: true ép kiểu cho giá trị khai báo trong .env
const configServer = configSchema.safeParse(process.env)

if (!configServer.success) {
  console.log('Các giá trị khai báo trong file .env không hợp lệ')
  console.error(configServer.error)
  process.exit(1)
}

const envConfig = configServer.data

export default envConfig
