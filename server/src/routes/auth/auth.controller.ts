import { Body, Controller, Post, Put } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginBodyDTO, RegisterBodyDTO } from './auth.dto'
import { ZodSerializerDto } from 'nestjs-zod'
import { MessageResDTO } from 'src/shared/dtos/response.dto'
import { IsPublic } from 'src/shared/decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic()
  @ZodSerializerDto(MessageResDTO)
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }

  @Post('login')
  @IsPublic()
  login(@Body() body: LoginBodyDTO) {
    return this.authService.login(body)
  }
}
