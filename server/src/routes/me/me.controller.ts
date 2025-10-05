import { Body, Controller, Get, Put } from '@nestjs/common'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { UpdateUserBodyDTO } from 'src/shared/dtos/user.dto'
import { MeService } from './me.service'

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  getMe(@ActiveUser('userId') userId: string) {
    return this.meService.getMe(userId)
  }

  @Put()
  updateMe(@Body() body: UpdateUserBodyDTO, @ActiveUser('userId') userId: string) {
    return this.meService.updateMe(userId, body)
  }
}
