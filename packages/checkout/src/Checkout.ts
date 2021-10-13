import {
  cloneMap,
  initialAddress,
  initialClient,
  offersArrToMap,
} from './utils'
import mitt, { MittEmitter } from './mitt'

import { Address } from './types/Address'
import { Client } from './types/Client'
import { Offer } from './types/Offer'
import { ServiceProduct } from './types/Product'
import { v4 as uuidv4 } from 'uuid'

export const checkoutEvents = ['clientChange', 'shippingAddressChange'] as const

export type CheckoutArgs = {
  storage?: Storage
  url?: string
  prefix?: string
}

export type UpdateParams<T> = {
  uniqueId?: string
  uniqueIds?: string[]
  value: T
}

export class Checkout {
  private _shippingAddress: Address
  private _client: Client
  private _storage: Storage
  CHECKOUT_SHIPPING_ADDRESS_KEY = '_checkout_shipping'
  CHECKOUT_CLIENT_KEY = '_checkout_client'

  constructor({ storage, url, prefix = 'fi' }: CheckoutArgs) {
    this.CHECKOUT_SHIPPING_ADDRESS_KEY =
      prefix + this.CHECKOUT_SHIPPING_ADDRESS_KEY
    this.CHECKOUT_CLIENT_KEY = prefix + this.CHECKOUT_CLIENT_KEY
    let addressInStorage
    let clientInStorage
    if (storage && storage instanceof Storage) {
      addressInStorage = storage.getItem(this.CHECKOUT_SHIPPING_ADDRESS_KEY)
      clientInStorage = storage.getItem(this.CHECKOUT_CLIENT_KEY)
    }
    this._storage = storage
    this.shippingAddress = addressInStorage
      ? JSON.parse(addressInStorage)
      : null
    this.client = clientInStorage ? JSON.parse(clientInStorage) : null
  }

  get getShippingAddress(): Address {
    return this._shippingAddress
  }

  set shippingAddress(address: Address) {
    this._shippingAddress = address
  }

  get client(): Client {
    return this._client
  }

  set client(client: Client) {
    this._client = client
  }

  updateClient(client: Partial<Client>) {
    this.client = {
      ...this._client,
      ...client,
    }
    return this.client
  }

  removeClient() {
    this.client = null
  }

  removeShippingAddress() {
    this.shippingAddress = null
  }

  updateShippingAddress(shippingAddress: Partial<Address>) {
    this.shippingAddress = {
      ...this._shippingAddress,
      ...shippingAddress,
    }
    return this.shippingAddress
  }

  get storage(): Storage {
    return this._storage
  }
}
