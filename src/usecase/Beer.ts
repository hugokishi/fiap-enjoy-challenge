import { Logger, init as initLogger } from '@app/logger'
import {
  Beer,
  BeerRepository,
  init as initBeerRepository
} from '@repository/Beer'
import { BeerCreateInput } from '@interfaces/Beer'

export class BeerUseCase {
  private log: Logger
  private beerRepository: BeerRepository

  constructor({ log, beerRepository }) {
    this.log = log
    this.beerRepository = beerRepository
  }

  public create = (beer: BeerCreateInput): Promise<Beer> => {
    return this.beerRepository.create(beer)
  }

  public listAll = (): Promise<Beer[]> => {
    return this.beerRepository.listAll()
  }
}

export const init = () => {
  const log = initLogger()
  const beerRepository = initBeerRepository()

  return new BeerUseCase({ log, beerRepository })
}

export default init
