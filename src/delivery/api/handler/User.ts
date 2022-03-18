import {
  init as InitRouter,
  NextFunction,
  Request,
  Response
} from '@driver/http/express'
import { UserUseCase, init as initUserUseCase } from '@usecase/User'
import { UserCreateInput } from '@interfaces/User'

export class BeerHandler {
  private userUseCase: UserUseCase

  constructor(router, userUseCase) {
    this.userUseCase = userUseCase

    router.post('/users', this.create)
    router.get('/users/:phone', this.getUser)
    router.put('/users/:id', this.update)
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, name, cpf }: UserCreateInput = req.body
      const user = await this.userUseCase.create({ phone, name, cpf })
      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, cpf } = req.body
      const userId = req.params.id
      const user = await this.userUseCase.update(name, cpf, Number(userId))
      res.send(user)
    } catch (error) {
      next(error)
    }
  }

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const phone: string = req.params.phone
      const user = await this.userUseCase.getUserByTelephone(phone)
      res.send(user)
    } catch (error) {
      next(error)
    }
  }
}

export const init = () => {
  const router = InitRouter()
  const userUseCase = initUserUseCase()

  return new BeerHandler(router, userUseCase)
}

export default init
