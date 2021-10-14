import { ServiceCheckout } from '@finetwork/checkout'

export const checkout = new ServiceCheckout({
  storage: typeof window !== 'undefined' ? localStorage : null,
})
