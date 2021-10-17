import {
  Address,
  Client,
  Offer,
  Operator,
  ServiceCheckout,
} from '@finetwork/checkout'

export type State = {
  shippingAddress: Address
  client: Client
  offers: Offer[]
  acceptAdvertising: boolean
  operator: Operator
  shopId: number
}

export type ServiceCheckoutState = {
  state: State
  checkout: ServiceCheckout
}

export const initialState: State = {
  shippingAddress: null,
  client: null,
  offers: [],
  acceptAdvertising: false,
  operator: null,
  shopId: null,
}
