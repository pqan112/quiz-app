import { Injectable } from '@nestjs/common'
import { AuthRepo } from './auth.repo'
import { LoginBodyType, RegisterBodyType } from './auth.model'
import {
  EmailAlreadyInUseException,
  EmailNotFoundException,
  IncorrectPasswordException,
  RegisterSuccessfully,
} from './auth.message'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenPayloadCreate } from 'src/shared/types/jwt.type'
import { TokenService } from 'src/shared/services/token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  private async generateTokens(payload: TokenPayloadCreate) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ])

    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.authRepo.updateUserById({
      user_id: payload.userId.toString(),
      refresh_token: refreshToken,
      rft_expires_at: new Date(decodedRefreshToken.exp * 1000),
    })

    return { accessToken, refreshToken }
  }

  async register(body: RegisterBodyType) {
    try {
      const { email, password } = body
      const user = await this.authRepo.findUserByEmail(email)
      if (user) {
        throw EmailAlreadyInUseException
      }
      const hashedPassword = await this.hashingService.hash(password)
      await this.authRepo.register({
        email,
        password: hashedPassword,
      })
      return { message: RegisterSuccessfully }
    } catch (error) {
      throw error
    }
  }

  async login(body: LoginBodyType) {
    try {
      const { email, password } = body
      const user = await this.authRepo.findUserByEmail(email)
      if (!user) {
        throw EmailNotFoundException
      }

      const isPasswordMatch = await this.hashingService.compare(password, user.password)
      if (!isPasswordMatch) {
        throw IncorrectPasswordException
      }
      const { accessToken, refreshToken } = await this.generateTokens({ userId: user._id })

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      }
    } catch (error) {
      throw error
    }
  }
}
