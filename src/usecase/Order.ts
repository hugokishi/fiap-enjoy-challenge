import { Logger, init as initLogger } from '@app/logger'
import {
  Order,
  OrderRepository,
  init as initOrderRepository
} from '@repository/Order'
import { BeerRepository, init as initBeerRepository } from '@repository/Beer'

export class OrderUseCase {
  private log: Logger
  private orderRepository: OrderRepository
  private beerRepository: BeerRepository

  constructor({ log, orderRepository, beerRepository }) {
    this.log = log
    this.orderRepository = orderRepository
    this.beerRepository = beerRepository
  }

  public create = async (order: any): Promise<Order> => {
    const beer = await this.beerRepository.findManyBasedOnIds(order.beer)

    order.beer = beer
    return this.orderRepository.save(order)
  }
}

export const init = () => {
  const log = initLogger()
  const orderRepository = initOrderRepository()
  const beerRepository = initBeerRepository()

  return new OrderUseCase({ log, orderRepository, beerRepository })
}

export default init
