import { ObjectId } from 'mongodb'

export interface TokenPayloadCreate {
  userId: ObjectId
}

export interface TokenPayload extends TokenPayloadCreate {
  exp: number // thời gian hết hạn
  iat: number // thời điểm khởi tạo
}
