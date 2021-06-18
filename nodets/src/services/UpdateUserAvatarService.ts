import User from '../models/User'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import path from 'path'
import fs from 'fs'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute ({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findOne(userId)

    if (!user) {
      throw new AppError('Only authenticate users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
