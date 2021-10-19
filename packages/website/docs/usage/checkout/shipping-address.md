---
sidebar_position: 2
---

# Shipping address

Import checkout previously initialized, and add client data.

## Add shipping address

```js
import { checkout } from './lib'

checkout.shippingAddress = {
  door: '23',
  floor: '2',
  locality: 'elche',
  name: 'elche',
  number: 23,
  postalCode: '23332',
  province: 'alc',
  type: 2,
}
```

## Update shipping address

```js
checkout.updateShippingAddress({
  locality: 'bcn',
  name: 'barcelona',
})
```

## Remove shipping address

```js
checkout.removeShippingAddress()
```
