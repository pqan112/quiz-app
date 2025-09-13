export interface TokenPayloadCreate {
  userId: number
}

export interface TokenPayload extends TokenPayloadCreate {
  exp: number // thời gian hết hạn
  iat: number // thời điểm khởi tạo
}
