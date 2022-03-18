import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm'
import Beer from './Beer'
import User from './User'

@Entity()
class Order {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  total?: number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ManyToMany(() => Beer, (beer) => beer.order)
  @JoinTable()
  beer?: Beer[]
}

export default Order
