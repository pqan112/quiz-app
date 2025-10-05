import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'

export const EmailNotFoundException = new UnprocessableEntityException([
  {
    path: 'email',
    message: 'Error.email.not_found',
  },
])

export const IncorrectPasswordException = new UnprocessableEntityException([
  {
    path: 'password',
    message: 'Error.password.incorrect',
  },
])

export const UserNotFoundException = new NotFoundException('Error.user.not_found')
