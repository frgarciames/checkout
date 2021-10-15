---
sidebar_position: 1
---

# Order

ServiceCheckout exposes one method to create an order _(createOrder)_
You can create a client and order in separated way or just using _(createOrderWithClient)_ to create both

### Separated way

```js
import { checkout } from './lib'

const createClient = async () => {
  checkout.addClient = {
    birthDate: '23/10/1994',
    email: 'fran17901@gmail.com',
    iban: 'ES34 3453 3455 3455 3455',
    identificationDocument: '77818881K',
    identificationType: 'NIF',
    name: 'Fran',
    phone: '666666666',
    secondSurname: 'Meseguer',
    surname: 'Garcia',
  }
  const newClient = await checkout.createClient()
  createOrder(newClient.id)
}
const createOrder = async (clientId) => {
  checkout.addOffer({
    id: 23,
    promotionId: 3,
    products: [...],
    ...rest,
  })
  const headers = {} // Headers auth
  const newOrder = await checkout.createOrder(newClient.id, headers)
}
```

### Create both

```js
import { checkout } from './lib'

const createClientAndCreateOrder = async () => {
  checkout.addClient = {
    birthDate: '23/10/1994',
    email: 'fran17901@gmail.com',
    iban: 'ES34 3453 3455 3455 3455',
    identificationDocument: '77818881K',
    identificationType: 'NIF',
    name: 'Fran',
    phone: '666666666',
    secondSurname: 'Meseguer',
    surname: 'Garcia',
  }
  checkout.addOffer({
    id: 23,
    promotionId: 3,
    products: [...],
    ...rest,
  })
  const {order, client} = await checkout.createOrderWithClient()
}
```
