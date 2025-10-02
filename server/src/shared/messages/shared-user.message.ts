import { UnprocessableEntityException } from '@nestjs/common'

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
