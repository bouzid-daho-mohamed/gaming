// src/pages/AdminOrders.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Définition des types pour TypeScript
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  wilaya: string;
  baladia: string;
  total_price: number;
  created_at: string;
  items: OrderItem[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    setLoading(false);
    if (error) {
      console.error('Error fetching orders:', error.message);
    } else if (data) {
      setOrders(data);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Catalogue</h2>
        <ul className="space-y-4">
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Propriétaires</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Unités</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Commandes</li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Utilisateurs</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Commandes</h1>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Rafraîchir
          </button>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wilaya</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baladia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (DZD)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.wilaya}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.baladia}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total_price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          {expandedId === order.id ? (
                            <><ChevronUp size={16} /><span className="ml-1">Cacher</span></>
                          ) : (
                            <><ChevronDown size={16} /><span className="ml-1">Détails</span></>
                          )}
                        </button>
                      </td>
                    </tr>

                    {expandedId === order.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <h4 className="font-medium mb-2">Produits commandés :</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-700">
                                <Link
                                  to={`/products/${item.id}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {item.name}
                                </Link>
                                {' '}— Qté : {item.quantity} — Prix unitaire : {item.price.toFixed(2)} DZD
                                {item.selectedColor && (
                                  <span> — Couleur : {item.selectedColor}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}