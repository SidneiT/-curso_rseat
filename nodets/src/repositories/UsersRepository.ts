import { EntityRepository, Repository } from 'typeorm'
import User from '../models/User'

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail (email: string) : Promise<User | null> {
    const findAppointment = await this.findOne({
      where: { email }
    })

    return findAppointment || null
  }
}

export default UsersRepository
