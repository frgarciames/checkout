import React, { FC, useEffect, useState } from 'react'
import { State, initialState } from './State'

import { Context } from './Context'
import { ServiceCheckout } from '@finetwork/checkout'

type StateKeys =
  | 'client'
  | 'shippingAddress'
  | 'offers'
  | 'acceptAdvertising'
  | 'shopId'
  | 'operator'
type ProviderProps = {
  checkout: ServiceCheckout
}

export const Provider: FC<ProviderProps> = ({ children, checkout }) => {
  const [state, setState] = useState<State>(initialState)
  const patchState = (key: StateKeys) => (value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  useEffect(() => {
    ServiceCheckout.events.on('clientChange', patchState('client'))
    ServiceCheckout.events.on(
      'shippingAddressChange',
      patchState('shippingAddress')
    )
    ServiceCheckout.events.on('offersChange', patchState('offers'))
    ServiceCheckout.events.on(
      'acceptAdvertisingChange',
      patchState('acceptAdvertising')
    )
    ServiceCheckout.events.on('operatorChange', patchState('operator'))
    ServiceCheckout.events.on('shopIdChange', patchState('shopId'))
    return () => {
      ServiceCheckout.events.off('clientChange', patchState('client'))
      ServiceCheckout.events.off(
        'shippingAddressChange',
        patchState('shippingAddress')
      )
      ServiceCheckout.events.off('offersChange', patchState('offers'))
      ServiceCheckout.events.off(
        'acceptAdvertisingChange',
        patchState('acceptAdvertising')
      )
      ServiceCheckout.events.off('operatorChange', patchState('operator'))
      ServiceCheckout.events.off('shopIdChange', patchState('shopId'))
    }
  }, [])
  return (
    <Context.Provider
      value={{
        checkout,
        state,
      }}
    >
      {children}
    </Context.Provider>
  )
}
