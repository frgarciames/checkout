import { Offer } from './types/Offer'

export const cloneMap = (map: Map<string, any>) => new Map(map)
export const offersArrToMap = (arr: Offer[]) =>
  new Map(arr.map((i) => [i.uniqueId, i]))
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
