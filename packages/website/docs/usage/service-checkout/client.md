---
sidebar_position: 3
---

# Client

ServiceCheckout exposes one method to create a client _(createClient)_

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
}
```
