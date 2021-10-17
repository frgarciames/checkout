import { ServiceCheckoutState, initialState } from './State'

import { createContext } from 'react'

export const Context = createContext<ServiceCheckoutState>({
  state: initialState,
  checkout: null,
})
