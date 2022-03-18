import { Repository, UpdateResult } from 'typeorm'
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

  public update = (
    name: string,
    cpf: string,
    id: number
  ): Promise<UpdateResult> => {
    return this.database
      .createQueryBuilder()
      .update(User)
      .set({ name, cpf })
      .where('id = :id', { id })
      .execute()
  }

  public getUserByTelephone = (phone: string): Promise<User> => {
    return this.database.findOne({
      where: {
        phone
      },
      relations: ['orders', 'orders.beer', 'orders.beer.style']
    })
  }

  public getUserById = (id: number): Promise<User> => {
    return this.database.findOne({
      where: {
        id
      }
    })
  }
}

export const init = () => {
  const database = initDatabase()

  return new UserRepository(database)
}

export default init
