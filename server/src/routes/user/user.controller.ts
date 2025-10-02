import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { GetUserParamsDTO, UpdateUserBodyDTO } from './user.dto'
import { IsPublic } from 'src/shared/decorators/auth.decorator'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@ActiveUser('userId') userId: string) {
    return this.userService.getUserById(userId)
  }

  @Put('me')
  updateMe(@Body() body: UpdateUserBodyDTO, @ActiveUser('userId') userId: string) {
    return this.userService.updateUserById(userId, body)
  }

  @Get(':userId')
  getUserById(@Param() params: GetUserParamsDTO) {
    return this.userService.getUserById(params.userId)
  }

  @Put(':userId')
  updateUserById(@Body() body: UpdateUserBodyDTO, @Param() params: GetUserParamsDTO) {
    return this.userService.updateUserById(params.userId, body)
  }
}
