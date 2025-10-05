import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { GetUserParamsDTO, UpdateUserBodyDTO } from 'src/shared/dtos/user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getUserById(@Param() params: GetUserParamsDTO) {
    return this.userService.getUserById(params.userId)
  }

  @Put(':userId')
  updateUserById(@Body() body: UpdateUserBodyDTO, @Param() params: GetUserParamsDTO) {
    return this.userService.updateUserById(params.userId, body)
  }
}
