---
sidebar_position: 2
---

# Configuration

You will need the ServiceCheckoutProvider in order to inject checkout data into your application.

```js
import { ServiceCheckoutProvider } from '@finetwork/checkout-react'
import { checkout } from './lib' // checkout previously initialized

function App() {
  return (
    <ServiceCheckoutProvider checkout={checkout}>
      <YourApp />
    </ServiceCheckoutProvider>
  )
}
```
