import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import Order from './Order'

@Entity()
class User {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  phone?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  cpf?: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
}

export default User
