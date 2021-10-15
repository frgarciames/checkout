import {
  Checkout,
  CheckoutArgs,
  UpdateParams,
  checkoutEvents,
} from './Checkout'
import {
  cloneMap,
  getCheckoutProxy,
  isServer,
  offerToOrderLines,
  offersArrToMap,
} from './utils'
import mitt, { MittEmitter } from './mitt'

import { Client } from './types/Client'
import { Offer } from './types/Offer'
import { Operator } from './types/Operator'
import { Order } from './types/Order'
import { ServiceProduct } from './types/Product'
import { v4 as uuidv4 } from 'uuid'

export const serviceCheckoutEvents = [
  ...checkoutEvents,
  'offersChange',
] as const
export type ServiceCheckoutEvent = typeof serviceCheckoutEvents[number]
type ServiceCheckoutBase = {
  checkout: ServiceCheckout | null
  readyCallbacks: Array<() => any>
  ready(cb: () => any): void
}

const singletonCheckout: ServiceCheckoutBase = {
  checkout: null,
  readyCallbacks: [],
  ready(cb: () => void) {
    if (this.checkout) return cb()
    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb)
    }
  },
}

serviceCheckoutEvents.forEach((event) => {
  singletonCheckout.ready(() => {
    ServiceCheckout.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(
        1
      )}`
      const _singletonCheckout = singletonCheckout as any
      if (_singletonCheckout[eventField]) {
        try {
          _singletonCheckout[eventField](...args)
        } catch (err) {
          console.error(`Error when running the Checkout event: ${eventField}`)
        }
      }
    })
  })
})

export class ServiceCheckout extends Checkout {
  private _offers: Map<string, Offer>
  private _acceptAdvertising: boolean = false
  private _shopId: number = 99
  private _operator: Operator = {
    id: 1,
  }
  CHECKOUT_OFFERS_KEY = '_checkout_offers'

  events: MittEmitter<ServiceCheckoutEvent>
  static events: MittEmitter<ServiceCheckoutEvent> = mitt()

  constructor(args: CheckoutArgs) {
    super(args)
    const { prefix = 'fi', storage } = args
    this.CHECKOUT_OFFERS_KEY = prefix + this.CHECKOUT_OFFERS_KEY
    let offersInStorage
    if (storage && storage instanceof Storage) {
      offersInStorage = storage.getItem(this.CHECKOUT_OFFERS_KEY)
    }
    this.offers = offersInStorage
      ? offersArrToMap(JSON.parse(offersInStorage))
      : new Map()

    return getCheckoutProxy(this, ServiceCheckout, {
      set: (target: ServiceCheckout, name: string, value: any) => {
        if (target.storage && name === 'offers') {
          const offers = Array.from((value as Map<string, Offer>).values())
          if (offers.length > 0) {
            target.storage.setItem(
              this.CHECKOUT_OFFERS_KEY,
              JSON.stringify(offers)
            )
            ServiceCheckout.events.emit('offersChange', target.offers)
          }
        }
      },
    })
  }

  get offers(): Map<string, Offer> {
    return this._offers
  }

  set offers(offers: Map<string, Offer>) {
    this._offers = offers
  }

  get acceptAdvertising(): boolean {
    return this._acceptAdvertising
  }

  set acceptAdvertising(acceptAdvertising: boolean) {
    this._acceptAdvertising = acceptAdvertising
  }

  get shopId(): number {
    return this._shopId
  }

  set shopId(shopId: number) {
    this._shopId = shopId
  }

  get operator(): Operator {
    return this._operator
  }

  set operator(operator: Operator) {
    this._operator = operator
  }

  addOffer(offer: Offer) {
    const offers: Map<string, Offer> = cloneMap(this._offers)
    const newOffer: Offer = { ...offer, uniqueId: uuidv4() }
    offers.set(newOffer.uniqueId, newOffer)
    if (!offer.products) {
      offer.products = []
    }
    this.offers = offers
  }

  updateOffer(uniqueId: string, offer: Offer) {
    const offers: Map<string, Offer> = cloneMap(this._offers)
    offers.set(uniqueId, {
      ...offers.get(uniqueId),
      ...offer,
    })
    this.offers = offers
  }

  removeOffer(uniqueId: string) {
    const offers: Map<string, Offer> = cloneMap(this._offers)
    offers.delete(uniqueId)
    this.offers = offers
  }

  getOfferByUniqueId(id: string): Offer {
    return this.offers.get(id)
  }

  addProduct({ uniqueId, value }: UpdateParams<ServiceProduct>) {
    const offers: Map<string, Offer> = cloneMap(this._offers)
    const offer: Offer = offers.get(uniqueId)
    offer.products = [
      ...offer.products,
      {
        uniqueId,
        ...value,
      },
    ]
    this.offers = offers
  }

  updateProduct({ uniqueIds, value }: UpdateParams<ServiceProduct>) {
    const offers: Map<string, Offer> = cloneMap(this._offers)
    const offer: Offer = offers.get(uniqueIds[0])
    const productIndex = offer.products.findIndex(
      (product) => product.uniqueId === uniqueIds[1]
    )
    offer.products[productIndex] = {
      ...offer.products[productIndex],
      ...value,
    }
    this.offers = offers
  }

  removeProduct(uniqueIds: string[]) {
    const offers: Map<string, Offer> = cloneMap(this._offers)
    const offer: Offer = offers.get(uniqueIds[0])
    const productIndex = offer.products.findIndex(
      (product) => product.uniqueId === uniqueIds[1]
    )
    offer.products.splice(productIndex, 1)
    this.offers = offers
  }

  async createClient(mapClient?: (client: Client) => unknown): Promise<Client> {
    if (isServer()) {
      throw new Error('Server side not allowed. Use SDK in client environment.')
    }
    const client = mapClient ? mapClient(this.client) : this.client
    try {
      const data: Client = await (
        await fetch(this.urlClient, {
          method: 'POST',
          body: JSON.stringify(client),
        })
      ).json()
      return data
    } catch (error) {
      throw new Error(`Error creating client. Error: ${error}`)
    }
  }

  async createOrder(
    clientId: number,
    headers?: HeadersInit,
    mapOrder?: (offers: Offer[]) => any
  ) {
    if (isServer()) {
      throw new Error('Server side not allowed. Use SDK in client environment.')
    }
    const offersArr = Array.from(this.offers.values())
    const offers: any[] = mapOrder ? mapOrder(offersArr) : offersArr
    const orderLines = [].concat.apply([], offers.map(offerToOrderLines))
    const order: Order = {
      acceptAdvertising: this.acceptAdvertising,
      dtype: 'ordercontractnew',
      masterOrderId: `${clientId}${Math.floor(Date.now() / 1000)}`,
      shippingAddress: this.shippingAddress,
      shopId: this.shopId,
      clientId,
      orderLines,
    }
    try {
      const data = await (
        await fetch(this.urlOrder, {
          method: 'POST',
          body: JSON.stringify(order),
          headers: headers ?? {},
        })
      ).json()
      return data
    } catch (error) {
      throw new Error(`Error creating order. Error: ${error}`)
    }
  }

  async createOrderWithClient(
    mapClient?: (client: Client) => unknown,
    mapOrder?: (offers: Offer[]) => unknown
  ) {
    if (isServer()) {
      throw new Error('Server side not allowed. Use SDK in client environment.')
    }
    try {
      const client: Client = await this.createClient(mapClient)
      // TODO: Add auth headers
      const order = await this.createOrder(client.id, undefined, mapOrder)
      return { order, client }
    } catch (error) {
      throw new Error(error)
    }
  }
}
