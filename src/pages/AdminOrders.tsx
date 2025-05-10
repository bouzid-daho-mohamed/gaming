import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

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
    <div className="pt-24 pb-16">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Admin
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Refresh Orders
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h2>
            <p className="text-gray-600">There are currently no orders in the system.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.wilaya}, {order.baladia}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${order.total_price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-900"
                        >
                          {expandedId === order.id ? (
                            <>Hide Details <ChevronUp size={16} className="ml-1" /></>
                          ) : (
                            <>View Details <ChevronDown size={16} className="ml-1" /></>
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedId === order.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="text-sm text-gray-900">
                            <h4 className="font-medium mb-2">Order Items:</h4>
                            <ul className="space-y-2">
                              {order.items.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium">{item.name}</span>
                                    {item.selectedColor && (
                                      <span className="text-gray-600"> - {item.selectedColor}</span>
                                    )}
                                  </div>
                                  <div className="text-gray-600">
                                    {item.quantity} × ${item.price.toFixed(2)}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}