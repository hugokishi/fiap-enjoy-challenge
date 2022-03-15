import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import User from './User'

@Entity()
class Order {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false, array: true })
  order?: string

  @Column({ nullable: false })
  total?: number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToOne(() => User, (user) => user.orders)
  user: User
}

export default Order
