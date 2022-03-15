import { Logger, init as initLogger } from '@app/logger'
import {
  Order,
  OrderRepository,
  init as initOrderRepository
} from '@repository/Order'

export class OrderUseCase {
  private log: Logger
  private orderRepository: OrderRepository

  constructor({ log, orderRepository }) {
    this.log = log
    this.orderRepository = orderRepository
  }

  public create = (order: any): Promise<Order> => {
    return this.orderRepository.create(order)
  }
}

export const init = () => {
  const log = initLogger()
  const orderRepository = initOrderRepository()

  return new OrderUseCase({ log, orderRepository })
}

export default init
