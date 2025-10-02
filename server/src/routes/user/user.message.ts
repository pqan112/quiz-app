import { NotFoundException } from '@nestjs/common'

export const UserNotFoundException = new NotFoundException('Error.user.not_found')
