"use client"

import React, { useState } from "react"
import { AdminPanel } from "@/components/admin-panel"
import { CustomerOrder } from "@/components/customer-order"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { Dish, Order } from "@/types"

export default function FoodOrderingApp() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Sałatka Cezar",
      description: "Klasyczna sałatka Cezar z kurczakiem, parmezanem i grzankami",
      price: 20.0,
      availableQuantity: 50,
      originalQuantity: 50,
    },
    {
      id: "2",
      name: "Zupa dnia - Żurek",
      description: "Tradycyjny żurek z kiełbasą i jajkiem",
      price: 5.0,
      availableQuantity: 30,
      originalQuantity: 30,
    },
    {
      id: "3",
      name: "Kotlet schabowy z ziemniakami",
      description: "Tradycyjny kotlet schabowy z gotowanymi ziemniakami i surówką",
      price: 18.5,
      availableQuantity: 15,
      originalQuantity: 15,
    },
  ])

  const [orders, setOrders] = useState<Order[]>([])

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const addDish = (dish: Omit<Dish, "id">) => {
    const newDish: Dish = {
      ...dish,
      id: Date.now().toString(),
    }
    setDishes((prev) => [...prev, newDish])
  }

  const updateDish = (dishId: string, updates: Partial<Dish>) => {
    setDishes((prev) => prev.map((dish) => (dish.id === dishId ? { ...dish, ...updates } : dish)))
  }

  const deleteDish = (dishId: string) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== dishId))
  }

  const placeOrder = (order: Omit<Order, "id" | "timestamp">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    // Update dish quantities
    order.dishes.forEach((orderDish) => {
      setDishes((prev) =>
        prev.map((dish) =>
          dish.id === orderDish.dishId
            ? { ...dish, availableQuantity: dish.availableQuantity - orderDish.quantity }
            : dish,
        ),
      )
    })

    setOrders((prev) => [...prev, newOrder])
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === "jedzenie") {
      setIsAdminAuthenticated(true)
      setShowAdminLogin(false)
      setAdminPassword("")
    } else {
      alert("Nieprawidłowe hasło!")
    }
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-8 border-2 border-gray-300 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-orange-600 mb-2">🍽️ HardBistro</CardTitle>
            <CardDescription className="text-xl text-gray-700 font-medium">Najlepsze bistro w mieście - zamawiaj online!</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="order" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200 border-2 border-gray-400 p-1">
            <TabsTrigger value="order" className="font-semibold text-gray-800 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md">Złóż zamówienie</TabsTrigger>
            <TabsTrigger value="admin" onClick={() => !isAdminAuthenticated && setShowAdminLogin(true)} className="font-semibold text-gray-800 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-md">
              Panel administracyjny
            </TabsTrigger>
          </TabsList>

          <TabsContent value="order" className="space-y-6">
            <CustomerOrder dishes={dishes} onPlaceOrder={placeOrder} />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            {!isAdminAuthenticated ? (
              showAdminLogin ? (
                <Card className="max-w-md mx-auto border-2 border-gray-300 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">🔐 Logowanie administratora</CardTitle>
                    <CardDescription className="text-lg text-gray-700 font-medium">Wprowadź hasło aby uzyskać dostęp do panelu</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-password">Hasło administratora</Label>
                        <Input
                          id="admin-password"
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="Wprowadź hasło..."
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                        Zaloguj się
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setShowAdminLogin(false)}
                      >
                        Anuluj
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="max-w-md mx-auto border-2 border-gray-300 shadow-lg">
                  <CardContent className="text-center py-8">
                    <p className="text-gray-700 mb-4 text-lg font-medium">Panel administracyjny wymaga autoryzacji</p>
                    <Button onClick={() => setShowAdminLogin(true)} className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg py-3">
                      Zaloguj się jako administrator
                    </Button>
                  </CardContent>
                </Card>
              )
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-800">Panel Administratora - HardBistro</h2>
                  <Button variant="outline" onClick={handleAdminLogout} className="border-2 border-gray-400 text-gray-800 font-bold">
                    Wyloguj się
                  </Button>
                </div>
                <AdminPanel
                  dishes={dishes}
                  orders={orders}
                  onAddDish={addDish}
                  onUpdateDish={updateDish}
                  onDeleteDish={deleteDish}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 