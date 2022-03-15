import { Logger, init as initLogger } from '@app/logger'
import {
  InformationsIFace,
  UserCreateInput,
  UserListOutput
} from '@interfaces/User'
import {
  User,
  UserRepository,
  init as initUserRepository
} from '@repository/User'

import { OrderRepository, init as initOrderRepository } from '@repository/Order'

export class UserUseCase {
  private log: Logger
  private userRepository: UserRepository
  private orderRepository: OrderRepository

  constructor({ log, userRepository, orderRepository }) {
    this.log = log
    this.userRepository = userRepository
    this.orderRepository = orderRepository
  }

  public create = async (user: UserCreateInput): Promise<User> => {
    return this.userRepository.create(user)
  }

  public getUserByTelephone = async (
    phone: string
  ): Promise<UserListOutput> => {
    const user = await this.userRepository.getUserByTelephone(phone)

    const lastOrder = await this.orderRepository.getOrderByUserId(user.id)

    const informations: InformationsIFace = {
      total_orders: null,
      average_ticket: 0,
      total_spend: 0,
      day_of_last_order: null
    }

    if (user.orders.length > 0) {
      user.orders.forEach((o) => {
        informations.total_orders = 1 + informations.total_orders
        informations.total_spend = informations.total_spend + o.total
      })

      informations.average_ticket =
        informations.total_spend / user.orders.length
      informations.day_of_last_order = lastOrder.createdAt
    }

    return {
      user,
      informations
    }
  }
}

export const init = () => {
  const log = initLogger()
  const userRepository = initUserRepository()
  const orderRepository = initOrderRepository()

  return new UserUseCase({ log, userRepository, orderRepository })
}

export default init
