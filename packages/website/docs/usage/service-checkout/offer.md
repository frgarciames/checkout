---
sidebar_position: 1
---

# Offer

Import checkout previously initalized, and manipulate offers.
As offers is a Map, it generates a unique id to easy manipulate offers, so each offer has uniqueId attribute.

## Add offer

```js
import { checkout } from './lib'

checkout.offers = [
  {
    id: 23,
    promotionId: 3,
    ...rest,
  },
]
// or
checkout.addOffer({
  id: 23,
  promotionId: 3,
  ...rest,
})
```

## Update offer

```js
checkout.updateOffer('uniqueId', {
  promotionId: 33,
})
```

## Remove offer

```js
checkout.removeOffer('uniqueId')
```

## Add product to offer

```js
checkout.addProduct({
  uniqueId: 'offer uniqueId',
  {
    id: 232,
    dtype: 'fiber',
    ...rest
  }
})
```

## Update product to offer

```js
checkout.updateProduct(['uniqueId offer', 'uniqueId product'], {
  id: 22,
  dtype: 'insurance',
})
```

## Remove product to offer

```js
checkout.removeProduct(['uniqueId offer', 'uniqueId product'])
```
