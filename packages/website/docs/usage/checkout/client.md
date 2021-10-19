---
sidebar_position: 1
---

# Client

Import checkout previously initialized, and add client data.

## Add client

```js
import { checkout } from './lib'

checkout.client = {
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
```

## Update client

```js
checkout.updateClient({
  billingAddress: {
    door: '23',
    floor: '2',
    locality: 'elche',
    name: 'elche',
    number: 23,
    postalCode: '23332',
    province: 'alc',
    type: 2,
  },
})
```

## Remove client

```js
checkout.removeClient()
```
