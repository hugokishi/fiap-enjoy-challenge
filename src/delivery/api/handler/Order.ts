import {
  init as InitRouter,
  NextFunction,
  Request,
  Response
} from '@driver/http/express'
import { OrderUseCase, init as initOrderUseCase } from '@usecase/Order'

export class OrderHandler {
  private orderUseCase: OrderUseCase

  constructor(router, orderUseCase) {
    this.orderUseCase = orderUseCase

    router.post('/orders/:id', this.create)
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order, user, total } = req.body
      const savedOrder = await this.orderUseCase.create({ order, user, total })
      res.send(savedOrder)
    } catch (error) {
      next(error)
    }
  }
}

export const init = () => {
  const router = InitRouter()
  const orderUseCase = initOrderUseCase()

  return new OrderHandler(router, orderUseCase)
}

export default init
