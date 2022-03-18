import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import Order from '@domain/entity/Order'

export { Order }

export class OrderRepository {
  private database: Repository<Order>

  constructor(database) {
    this.database = database.getRepository(Order)
  }

  public create = async (order: any): Promise<any> => {
    return this.database.create(order)
  }

  public save = async (order: any): Promise<any> => {
    return this.database.save(order)
  }

  public getOrderByUserId = (id: number): Promise<Order> => {
    return this.database.findOne({
      where: {
        user: id
      },
      order: {
        createdAt: 'DESC'
      },
      relations: ['beer']
    })
  }

  public getLastMonthOrdersByUserId = (id: number): Promise<Order[]> => {
    return this.database.find({
      where: {
        user: id,
        createdAt: {
          gt: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }
}

export const init = () => {
  const database = initDatabase()

  return new OrderRepository(database)
}

export default init
