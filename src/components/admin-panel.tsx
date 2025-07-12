"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Dish, Order } from "@/types"

interface AdminPanelProps {
  dishes: Dish[]
  orders: Order[]
  onAddDish: (dish: Omit<Dish, "id">) => void
  onUpdateDish: (dishId: string, updates: Partial<Dish>) => void
  onDeleteDish: (dishId: string) => void
}

export function AdminPanel({ dishes, orders, onAddDish, onUpdateDish, onDeleteDish }: AdminPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDish, setEditingDish] = useState<string | null>(null)
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    availableQuantity: "",
    originalQuantity: ""
  })

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault()
    onAddDish({
      name: newDish.name,
      description: newDish.description,
      price: parseFloat(newDish.price),
      availableQuantity: parseInt(newDish.availableQuantity),
      originalQuantity: parseInt(newDish.originalQuantity)
    })
    setNewDish({ name: "", description: "", price: "", availableQuantity: "", originalQuantity: "" })
    setShowAddForm(false)
  }

  const handleUpdateDish = (dishId: string, field: keyof Dish, value: string | number) => {
    onUpdateDish(dishId, { [field]: value })
    setEditingDish(null)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pl-PL')
  }

  return (
    <div className="space-y-6">
      {/* Dishes Management */}
      <Card className="border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">🍽️ Zarządzanie daniami</CardTitle>
              <CardDescription className="text-lg text-gray-700 font-medium">Dodaj, edytuj lub usuń dania z menu</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-orange-600 hover:bg-orange-700">
              {showAddForm ? "Anuluj" : "Dodaj danie"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <form onSubmit={handleAddDish} className="mb-6 p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dish-name">Nazwa dania</Label>
                  <Input
                    id="dish-name"
                    value={newDish.name}
                    onChange={(e) => setNewDish(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nazwa dania"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dish-price">Cena (zł)</Label>
                  <Input
                    id="dish-price"
                    type="number"
                    step="0.01"
                    value={newDish.price}
                    onChange={(e) => setNewDish(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dish-description">Opis</Label>
                <Input
                  id="dish-description"
                  value={newDish.description}
                  onChange={(e) => setNewDish(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Opis dania"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dish-available">Dostępna ilość</Label>
                  <Input
                    id="dish-available"
                    type="number"
                    value={newDish.availableQuantity}
                    onChange={(e) => setNewDish(prev => ({ ...prev, availableQuantity: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dish-original">Oryginalna ilość</Label>
                  <Input
                    id="dish-original"
                    type="number"
                    value={newDish.originalQuantity}
                    onChange={(e) => setNewDish(prev => ({ ...prev, originalQuantity: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Dodaj danie
              </Button>
            </form>
          )}

          <div className="space-y-4">
            {dishes.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                <div className="flex-1">
                  {editingDish === dish.id ? (
                    <div className="space-y-2">
                      <Input
                        value={dish.name}
                        onChange={(e) => handleUpdateDish(dish.id, "name", e.target.value)}
                        className="font-semibold"
                      />
                      <Input
                        value={dish.description}
                        onChange={(e) => handleUpdateDish(dish.id, "description", e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          step="0.01"
                          value={dish.price}
                          onChange={(e) => handleUpdateDish(dish.id, "price", parseFloat(e.target.value))}
                          className="w-20"
                        />
                        <Input
                          type="number"
                          value={dish.availableQuantity}
                          onChange={(e) => handleUpdateDish(dish.id, "availableQuantity", parseInt(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </div>
                  ) : (
                                         <>
                       <h3 className="font-bold text-lg text-gray-800 mb-1">{dish.name}</h3>
                       <p className="text-sm text-gray-700 mb-2">{dish.description}</p>
                       <p className="text-lg font-bold text-orange-600 mb-1">{dish.price.toFixed(2)} zł</p>
                       <p className="text-sm text-gray-600 font-medium">
                         Dostępne: {dish.availableQuantity} / {dish.originalQuantity} szt.
                       </p>
                     </>
                  )}
                </div>
                <div className="flex space-x-2">
                  {editingDish === dish.id ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingDish(null)}
                    >
                      Zapisz
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingDish(dish.id)}
                    >
                      Edytuj
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteDish(dish.id)}
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders Management */}
      <Card className="border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">📋 Zarządzanie zamówieniami</CardTitle>
          <CardDescription className="text-lg text-gray-700 font-medium">Przeglądaj wszystkie zamówienia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Brak zamówień</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="p-4 border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{order.customerName}</h3>
                      <p className="text-sm text-gray-700 mb-1">{order.phone}</p>
                      <p className="text-sm text-gray-700">{order.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-orange-600 mb-1">{order.total.toFixed(2)} zł</p>
                      <p className="text-sm text-gray-600">{formatDate(order.timestamp)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {order.dishes.map((dish, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{dish.dishName} x{dish.quantity}</span>
                        <span>{(dish.price * dish.quantity).toFixed(2)} zł</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 