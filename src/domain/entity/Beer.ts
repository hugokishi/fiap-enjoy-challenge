import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import BeerStyle from './BeerStyle'

@Entity()
class Beer {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  beerName?: string

  @Column({ nullable: false })
  price?: number

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToOne(() => BeerStyle, (beerStyle) => beerStyle.id)
  style: number
}

export default Beer
