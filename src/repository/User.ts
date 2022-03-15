import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import User from '@domain/entity/User'
import { UserCreateInput } from '@interfaces/User'

export { User }

export class UserRepository {
  private database: Repository<User>

  constructor(database) {
    this.database = database.getRepository(User)
  }

  public create = (user: UserCreateInput): Promise<User> => {
    return this.database.save(user)
  }

  // function to get user and user orders based on phone

  public getUserByTelephone = (phone: string): Promise<User> => {
    return this.database.findOne({
      where: {
        phone
      },
      relations: ['orders']
    })
  }
}

export const init = () => {
  const database = initDatabase()

  return new UserRepository(database)
}

export default init
