import { Injectable } from '@nestjs/common'
import { UserNotFoundException } from 'src/shared/messages/shared-user.message'
import { UpdateUserBodyType } from 'src/shared/models/user.model'
import { SharedUserRepo } from 'src/shared/repo/shared-user.repo'

@Injectable()
export class MeService {
  constructor(private readonly sUserRepo: SharedUserRepo) {}

  async getMe(userId: string) {
    const user = await this.sUserRepo.findUserById(userId)
    if (!user) {
      throw UserNotFoundException
    }
    return user
  }

  async updateMe(userId: string, body: UpdateUserBodyType) {
    const user = await this.sUserRepo.findUserById(userId)
    if (!user) {
      throw UserNotFoundException
    }
    await this.sUserRepo.updateUserById(userId, { ...body })
    return {
      message: 'Update user successfully',
    }
  }
}
