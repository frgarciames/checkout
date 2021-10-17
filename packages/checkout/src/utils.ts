import {
  FiberProduct,
  InsuranceProduct,
  MobileProduct,
  Offer,
  OrderLine,
  TvProduct,
} from './types'

export const cloneMap = (map: Map<string, any>) => new Map(map)
export const offersArrToMap = (arr: Offer[]) =>
  new Map(arr.map((i) => [i.uniqueId, i]))
export const isServer = () => typeof window === 'undefined'
export const initialAddress = {
  door: '',
  floor: '',
  locality: '',
  name: '',
  number: null,
  postalCode: '',
  province: '',
  type: null,
}
export const initialClient = {
  billingAddress: null,
  birthDate: '',
  email: '',
  iban: '',
  identificationDocument: '',
  identificationType: '',
  name: '',
  phone: '',
  secondSurname: '',
  surname: '',
}

export const offerToOrderLines = ({
  id,
  promotionId,
  additionalOffers,
  products,
}: Offer): OrderLine<any>[] => {
  const orderLines: OrderLine<any>[] = products.map((product) => {
    let orderLine: OrderLine<any> = {
      offerId: id,
      promotionId,
      convergenceId: product.convergenceId,
      productId: product.id,
      providerId: product.providerId,
      dtype: product.dtype,
      mandatory: product.mandatory,
    }
    switch (product.dtype) {
      case 'orderlinefiber':
        orderLine = {
          homeId: product.homeId,
          installationAddress: product.installationAddress,
          ...orderLine,
        } as OrderLine<FiberProduct>
        break
      case 'orderlineinsurance':
        orderLine = {
          enabled: product.enabled,
          ...orderLine,
        } as OrderLine<InsuranceProduct>
        break
      case 'orderlinephoneline':
        orderLine = {
          icc: product.icc,
          msisdn: product.msisdn,
          donorOperatorId: product.donorOperatorId,
          operationType: product.operationType,
          ...orderLine,
        } as OrderLine<MobileProduct>
        break
      case 'orderlinetv':
        orderLine = {
          email: product.email,
          ...orderLine,
        } as OrderLine<TvProduct>
        break
      default:
        break
    }
    return orderLine
  })
  if (additionalOffers && additionalOffers.size > 0) {
    return [
      ...orderLines,
      ...Array.from(additionalOffers.values()).map(offerToOrderLines),
    ]
  }
  return orderLines
}

type SetFn = (target: any, name: string | symbol, value) => boolean | void

export const getCheckoutProxy = (
  checkout,
  Checkout,
  { set }: { set: SetFn }
) => {
  return new Proxy(checkout, {
    set: (target, name, value) => {
      target[name] = value
      if (target.storage) {
        let valueToStore
        let keyToStore
        switch (name) {
          case 'shippingAddress':
            const address = JSON.stringify(value)
            keyToStore = checkout.CHECKOUT_SHIPPING_ADDRESS_KEY
            valueToStore = address
            Checkout.events.emit(
              'shippingAddressChange',
              target._shippingAddress
            )
            break
          case 'client':
            const client = JSON.stringify(value)
            keyToStore = checkout.CHECKOUT_CLIENT_KEY
            valueToStore = client
            Checkout.events.emit('clientChange', target._client)
            break
          default:
            break
        }
        if (keyToStore && valueToStore) {
          target.storage.setItem(keyToStore, valueToStore)
        }
      }
      set && set(target, name, value)
      return true
    },
  })
}
