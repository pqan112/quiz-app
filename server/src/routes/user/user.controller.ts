import { Body, Controller, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserBodyDTO } from './user.dto'
import { IsPublic } from 'src/shared/decorators/auth.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @IsPublic()
  update(@Body() body: UpdateUserBodyDTO) {
    return this.userService.update(body)
  }
}
