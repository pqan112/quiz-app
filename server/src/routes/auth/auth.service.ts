import { Injectable } from '@nestjs/common'
import { AuthRepo } from './auth.repo'

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepo) {}
}
