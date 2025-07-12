"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Dish, Order } from "@/types"

interface CustomerOrderProps {
  dishes: Dish[]
  onPlaceOrder: (order: Omit<Order, "id" | "timestamp">) => void
}

export function CustomerOrder({ dishes, onPlaceOrder }: CustomerOrderProps) {
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({})

  const handleQuantityChange = (dishId: string, quantity: number) => {
    if (quantity < 0) return
    const dish = dishes.find(d => d.id === dishId)
    if (dish && quantity > dish.availableQuantity) return

    setSelectedDishes(prev => ({
      ...prev,
      [dishId]: quantity
    }))
  }

  const getTotalPrice = () => {
    return dishes.reduce((total, dish) => {
      const quantity = selectedDishes[dish.id] || 0
      return total + (dish.price * quantity)
    }, 0)
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    const orderDishes = dishes
      .filter(dish => selectedDishes[dish.id] && selectedDishes[dish.id] > 0)
      .map(dish => ({
        dishId: dish.id,
        dishName: dish.name,
        quantity: selectedDishes[dish.id],
        price: dish.price
      }))

    if (orderDishes.length === 0) {
      alert("Wybierz przynajmniej jedno danie!")
      return
    }

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert("Wypełnij wszystkie pola!")
      return
    }

    onPlaceOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      dishes: orderDishes,
      total: getTotalPrice()
    })

    // Reset form
    setCustomerName("")
    setPhone("")
    setAddress("")
    setSelectedDishes({})
    
    alert("Zamówienie zostało złożone! Dziękujemy!")
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">🍽️ Menu</CardTitle>
          <CardDescription className="text-lg text-gray-700 font-medium">Wybierz dania które chcesz zamówić</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dishes.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{dish.name}</h3>
                  <p className="text-sm text-gray-700 mb-2">{dish.description}</p>
                  <p className="text-lg font-bold text-orange-600 mb-1">{dish.price.toFixed(2)} zł</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Dostępne: {dish.availableQuantity} szt.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(dish.id, (selectedDishes[dish.id] || 0) - 1)}
                    disabled={(selectedDishes[dish.id] || 0) <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{selectedDishes[dish.id] || 0}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(dish.id, (selectedDishes[dish.id] || 0) + 1)}
                    disabled={(selectedDishes[dish.id] || 0) >= dish.availableQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">📋 Dane zamawiającego</CardTitle>
          <CardDescription className="text-lg text-gray-700 font-medium">Wprowadź swoje dane kontaktowe</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Imię i nazwisko</Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Jan Kowalski"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+48 123 456 789"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adres dostawy</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ul. Przykładowa 1, 00-000 Warszawa"
                required
              />
            </div>
            
            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-800">Suma:</span>
                <span className="text-2xl font-bold text-orange-600">
                  {getTotalPrice().toFixed(2)} zł
                </span>
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-3">
                🚀 Złóż zamówienie
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 