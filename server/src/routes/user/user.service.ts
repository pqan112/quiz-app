import { Injectable } from '@nestjs/common'
import { UpdateUserBodyType } from './user.model'
import { SharedUserRepo } from 'src/shared/repo/shared-user.repo'
import { EmailNotFoundException, IncorrectPasswordException } from '../auth/auth.message'
import { HashingService } from 'src/shared/services/hashing.service'
import { UserRepo } from './user.repo'
import { UserNotFoundException } from './user.message'

@Injectable()
export class UserService {
  constructor(
    private readonly sUserRepo: SharedUserRepo,
    private readonly userRepo: UserRepo,
    private readonly hashingService: HashingService,
  ) {}

  async getUserById(userId: string) {
    const user = await this.sUserRepo.findUserById(userId)
    if (!user) {
      throw UserNotFoundException
    }
    return user
  }

  async updateUserById(userId: string, body: UpdateUserBodyType) {
    const user = await this.sUserRepo.findUserById(userId)
    if (!user) {
      throw UserNotFoundException
    }
    await this.userRepo.update(userId, { ...body })
    return {
      message: 'Update user successfully',
    }
  }
}
