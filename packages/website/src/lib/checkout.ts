import { ServiceCheckout } from '@finetwork/checkout'

export const checkout = new ServiceCheckout({
  storage: typeof window !== 'undefined' ? localStorage : null,
  urlClient: process.env.URL_CLIENT,
  urlOrder: process.env.URL_ORDER,
})
