---
sidebar_position: 2
---

# Usage - custom hook

Import _useServiceCheckout_ that has checkout previously initialized and _state_ object with checkout data.

```js
import { useServiceCheckout } from '@finetwork/checkout-react'

function YourComponent() {
  const {
    state: { client },
  } = useServiceCheckout()
  return <h3>Hello {client.name} !</h3>
}
```
