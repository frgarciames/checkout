export interface Address {
  cp: string
  door: string
  floor: string
  city: string
  street: string
  number: number
  province: {
    id: number
    name: string
    value: string
    zone: string
  }
  streetType: {
    id: string
  }
}
