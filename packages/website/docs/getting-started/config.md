---
sidebar_position: 2
---

# Configuration

Import ServiceCheckout or ProductCheckout (under construction) passing your favorite storage (or none), chekout url and prefix

```js
import { ServiceCheckout } from '@finetwork/checkout'

export const checkout = new ServiceCheckout({
  url: 'https://api.com/order',
  //sessionStorage or undefined,
  storage: localStorage,
  //defaults to fi
  prefix: 'myshop',
})
```
