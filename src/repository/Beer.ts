import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import Beer from '@domain/entity/Beer'
import { BeerCreateInput } from '@interfaces/Beer'

export { Beer }

export class BeerRepository {
  private database: Repository<Beer>

  constructor(database) {
    this.database = database.getRepository(Beer)
  }

  public create = (beer: BeerCreateInput): Promise<Beer> => {
    return this.database.save(beer)
  }

  public listAll = (): Promise<Beer[]> => {
    return this.database
      .createQueryBuilder('beer')
      .leftJoinAndSelect('beer.style', 'style')
      .getMany()
  }

  public findManyBasedOnIds = (ids: number[]): Promise<Beer[]> => {
    return this.database.findByIds(ids)
  }
}

export const init = () => {
  const database = initDatabase()

  return new BeerRepository(database)
}

export default init
