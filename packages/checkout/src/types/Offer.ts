import { ServiceProduct } from './Product'

export interface Offer {
  id: number
  uniqueId?: string
  promotionId: number
  products?: ServiceProduct[]
  additionalOffers?: Map<string, Offer>
}
