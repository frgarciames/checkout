import { Address } from './Address'

export interface GenericServiceProduct {
  id?: number
  uniqueId?: string
  convergenceId?: number
  mandatory?: boolean
  providerId?: number
}

export interface FiberProduct extends GenericServiceProduct {
  homeId?: string
  installationAddress?: Address
}

export interface MobileProduct extends GenericServiceProduct {
  donorOperatorId?: number
  icc?: string
  msisdn?: string
  operationType?: number
}

export interface TvProduct extends GenericServiceProduct {
  email?: string
}

export interface InsuranceProduct extends GenericServiceProduct {
  enabled?: boolean
}

export type ServiceProduct =
  | ({
      dtype: 'orderlinephoneline'
    } & MobileProduct)
  | ({
      dtype: 'orderlineinsurance'
    } & InsuranceProduct)
  | ({
      dtype: 'orderlinetv'
    } & TvProduct)
  | ({
      dtype: 'orderlinefiber'
    } & FiberProduct)

// export type ServiceProduct<T> = {
//   dtype: DType,
// }
