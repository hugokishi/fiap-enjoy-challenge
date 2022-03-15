import {
  init as InitRouter,
  NextFunction,
  Request,
  Response
} from '@driver/http/express'
import { BeerUseCase, init as initBeerUseCase } from '@usecase/Beer'
import { BeerCreateInput } from '@interfaces/Beer'

export class BeerHandler {
  private beerUseCase: BeerUseCase

  constructor(router, beerUseCase) {
    this.beerUseCase = beerUseCase

    router.post('/beer', this.create)
    router.get('/beers', this.listAll)
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { beerName, style }: BeerCreateInput = req.body
      const beer = await this.beerUseCase.create({
        beerName,
        style
      })
      res.send(beer)
    } catch (error) {
      next(error)
    }
  }

  public listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const beers = await this.beerUseCase.listAll()
      res.send(beers)
    } catch (error) {
      next(error)
    }
  }
}

export const init = () => {
  const router = InitRouter()
  const beerUseCase = initBeerUseCase()

  return new BeerHandler(router, beerUseCase)
}

export default init
