import { initialAddress, initialClient } from './utils'

import { Checkout } from './Checkout'

describe('Checkout class', () => {
  let checkout: Checkout
  beforeEach(() => {
    checkout = new Checkout({})
    checkout.shippingAddress = initialAddress
    checkout.client = initialClient
  })
  it('should be a Checkout instance', () => {
    expect(checkout instanceof Checkout).toBeTruthy()
  })
  it('should get shippingAddress', () => {
    expect(checkout.shippingAddress).toEqual(initialAddress)
  })
  it('should get client', () => {
    expect(checkout.client).toEqual(initialClient)
  })
  it('should update client', () => {
    const name = 'pepito'
    checkout.updateClient({
      name,
    })
    expect(checkout.client.name).toEqual(name)
  })
  it('should update shippingAddress', () => {
    const city = 'piruleta'
    checkout.updateShippingAddress({
      city,
    })
    expect(checkout.shippingAddress.city).toEqual(city)
  })
})
