export type Dish = {
  id: string
  name: string
  description: string
  price: number
  availableQuantity: number
  originalQuantity: number
}

export type Order = {
  id: string
  customerName: string
  phone: string
  address: string
  dishes: { dishId: string; dishName: string; quantity: number; price: number }[]
  total: number
  timestamp: Date
} 