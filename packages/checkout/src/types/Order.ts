import { Address } from './Address'
import { DType } from './DType'

export type OrderLine<T> = T & {
  offerId: number
  productId: number
  promotionId: number
  dtype: DType
}

export type Order = {
  acceptAdvertising: boolean
  clientId: number
  dtype: DType
  masterOrderId: string
  orderLines: OrderLine<any>[]
  shopId: number
  shippingAddress: Address
}
