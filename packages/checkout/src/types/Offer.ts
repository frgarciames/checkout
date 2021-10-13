import {
  FiberProduct,
  InsuranceProduct,
  MobileProduct,
  TvProduct,
} from './Product'

export interface Offer {
  id: number
  uniqueId?: string
  promotionId: number
  products?: (FiberProduct | InsuranceProduct | MobileProduct | TvProduct)[]
  additionalOffers?: Map<string, Offer>
}
