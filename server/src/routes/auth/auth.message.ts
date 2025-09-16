import { UnprocessableEntityException } from '@nestjs/common'

export const InvalidEmail = 'Auth.email.invalid'
export const RegisterSuccessfully = 'Auth.register.success'

export const EmailAlreadyInUseException = new UnprocessableEntityException([
  {
    path: 'email',
    message: 'Auth.email.already_in_use',
  },
])

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
