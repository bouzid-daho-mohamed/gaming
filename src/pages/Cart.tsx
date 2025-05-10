// src/pages/Cart.tsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ChevronLeft, ArrowRight } from 'lucide-react'
import { useCart, getCartKey } from '../context/CartContext'
import { supabase } from '../lib/supabase'

interface OrderForm {
  name: string
  phone: string
  wilaya: string
  baladia: string
}

const Cart: React.FC = () => {
  // Récupère tout depuis votre contexte
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,             // ← Doit exister dans votre CartContext
  } = useCart()

  const [form, setForm] = useState<OrderForm>({
    name: '',
    phone: '',
    wilaya: '',
    baladia: '',
  })
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mise à jour des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Soumission en AJAX, on empêche le GET natif
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    // validation
    if (!form.name || !form.phone || !form.wilaya || !form.baladia) {
      setErrorMsg('Merci de remplir tous les champs.')
      return
    }

    setLoading(true)
    const { error } = await supabase
      .from('orders')              // ← votre table Supabase
      .insert([
        {
          items: cartItems.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            selectedColor: i.selectedColor,
          })),
          total_price: totalPrice,
          name: form.name,
          phone: form.phone,
          wilaya: form.wilaya,
          baladia: form.baladia,
        },
      ])

    setLoading(false)
    if (error) {
      console.error(error)
      setErrorMsg('Une erreur est survenue, veuillez réessayer.')
    } else {
      clearCart()
      alert('✅ Commande enregistrée avec succès !')
    }
  }

  // Si panier vide
  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20">
        <div className="container text-center">
          <div className="mb-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-primary-900 mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-600 mb-8">
            Vous n’avez pas encore ajouté de produits.
          </p>
          <Link to="/products" className="btn btn-primary inline-flex items-center">
            Continuer mes achats <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* — Liste des articles — */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium">
                  {totalItems} {totalItems > 1 ? 'Items' : 'Item'} in Cart
                </h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => {
                  const key = getCartKey(item)
                  return (
                    <li key={key} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                          <div>
                            <h3 className="text-base font-medium text-primary-900">
                              <Link to={`/products/${item.id}`}>{item.name}</Link>
                            </h3>
                            {item.selectedColor && (
                              <p className="mt-1 text-sm text-gray-500">
                                Color: {item.selectedColor}
                              </p>
                            )}
                          </div>
                          <p className="text-lg font-medium text-accent-600 mt-2 sm:mt-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(key, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
                            >
                              –
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={e =>
                                updateQuantity(key, parseInt(e.target.value) || 1)
                              }
                              className="w-12 h-8 border-t border-b border-gray-300 text-center"
                            />
                            <button
                              onClick={() => updateQuantity(key, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(key)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash2 size={18} className="mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="p-6 border-t border-gray-200">
                <Link
                  to="/products"
                  className="inline-flex items-center text-primary-700 hover:text-primary-900"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* — Récapitulatif + Formulaire — */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-4"
            >
              <h2 className="text-lg font-medium mb-4">Récapitulatif</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Sous-total</p>
                  <p className="font-medium">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Livraison</p>
                  <p className="font-medium">
                    {totalPrice >= 100 ? 'Gratuite' : '$10.00'}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Taxe</p>
                  <p className="font-medium">${(totalPrice * 0.1).toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="text-xl font-bold text-primary-900">
                    $
                    {(
                      totalPrice +
                      (totalPrice >= 100 ? 0 : 10) +
                      totalPrice * 0.1
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <h3 className="text-md font-medium mt-6">Vos coordonnées</h3>
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}

              <input
                name="name"
                placeholder="Nom"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                name="phone"
                placeholder="Téléphone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                name="wilaya"
                placeholder="Wilaya"
                value={form.wilaya}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                name="baladia"
                placeholder="Baladia"
                value={form.baladia}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-4"
              >
                {loading ? 'En cours…' : 'Passer la commande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
