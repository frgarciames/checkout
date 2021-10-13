import { Address } from './Address'
import { Client } from './Client'
import { Offer } from './Offer'

export interface Checkout {
  offers: Map<string, Offer>
  shippingAddress: Address
  client: Client
}
