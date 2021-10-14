---
sidebar_position: 1
---

# Events

In order to get the latest data, you can subscribe to events in _ServiceCheckout_, and it will fire when data will change.

```js
import { ServiceCheckout } from '@finetwork/checkout'

useEffect(() => {
  const onCheckoutChange = (data) => {
    console.log(data)
  }
  ServiceCheckout.events.on('clientChange', onCheckoutChange)
  ServiceCheckout.events.on('offersChange', onCheckoutChange)
  ServiceCheckout.events.on('shippingAddressChange', onCheckoutChange)
  return () => {
    // unsubscribe
    ServiceCheckout.events.off('clientChange', onCheckoutChange)
    ServiceCheckout.events.off('offersChange', onCheckoutChange)
    ServiceCheckout.events.off('shippingAddressChange', onCheckoutChange)
  }
}, [])
```
