/* eslint-disable camelcase */
import User from '@domain/entity/User'

export type UserCreateInput = {
  phone: string
  name?: string
  cpf?: string
}

export interface InformationsIFace {
  total_orders: number
  day_of_last_order: Date
  total_spend: number
  average_ticket: number
}

export type UserListOutput = {
  user: User
  informations?: InformationsIFace
}
