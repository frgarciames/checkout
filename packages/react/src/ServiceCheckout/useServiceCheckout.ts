import { Context } from './Context'
import { ServiceCheckoutState } from './State'
import { useContext } from 'react'

export const useServiceCheckout = (): ServiceCheckoutState => {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      'useServieceCheckout must be use within ServiceCheckoutProvider'
    )
  }
  return context
}
