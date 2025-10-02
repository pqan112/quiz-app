import { Injectable } from '@nestjs/common'
import { UpdateUserBodyType } from './user.model'
import { SharedUserRepo } from 'src/shared/repo/shared-user.repo'
import { EmailNotFoundException, IncorrectPasswordException } from '../auth/auth.message'
import { HashingService } from 'src/shared/services/hashing.service'
import { UserRepo } from './user.repo'

@Injectable()
export class UserService {
  constructor(
    private readonly sUserRepo: SharedUserRepo,
    private readonly userRepo: UserRepo,
    private readonly hashingService: HashingService,
  ) {}

  async update(body: UpdateUserBodyType) {
    const { email, password } = body
    const user = await this.sUserRepo.findUserByEmail(email)
    if (!user) {
      throw EmailNotFoundException
    }

    const isPasswordMatch = await this.hashingService.compare(password, user.password)
    if (!isPasswordMatch) {
      throw IncorrectPasswordException
    }

    const hashedPassword = await this.hashingService.hash(password)

    await this.userRepo.update(user._id.toString(), { ...body, password: hashedPassword })

    return {
      message: 'Update user successfully',
    }
  }
}
