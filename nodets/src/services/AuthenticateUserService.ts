import User from '../models/User'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  jwt: string
}

class AuthenticateUserService {
  public async execute ({ email, password }: Request): Promise <Response> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid user or password.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Invalid user or password.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const jwt = sign({}, secret, { subject: user.id, expiresIn })

    return {
      user,
      jwt
    }
  }
}

export default AuthenticateUserService
