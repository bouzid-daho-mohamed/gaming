import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { Loader2 } from 'lucide-react';           // petit spinner

type ProductInsert = Database['public']['Tables']['products']['Insert'];

const initialState: Omit<ProductInsert, 'id' | 'created_at'> = {
  name:        '',
  description: '',
  price:       0,
  category:    '',
  image:       '',
  featured:    false,
  is_new:      false,
  colors:      ['Black', 'White', 'Gray'],
  sizes:       ['S', 'M', 'L', 'XL'],
};

export default function AddProduct() {
  const [form, setForm]       = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const navigate              = useNavigate();

  /* ────────────────── handlers ────────────────── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase
      .from('products')
      .insert([{ ...form }])
      .select();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // succès
    navigate('/admin', { replace: true });
  };

  /* ────────────────── UI ────────────────── */
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Ajouter un produit</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-primary-300 focus:ring-2"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-primary-300 focus:ring-2"
            >
              <option value="" disabled>
                -- Choisir --
              </option>
              <option value="playstation">PlayStation</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium mb-1">Prix (€)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-primary-300 focus:ring-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              // value={form.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-primary-300 focus:ring-2"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Image (URL)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="https://…"
              className="w-full px-4 py-2 border rounded-md focus:ring-primary-300 focus:ring-2"
            />
          </div>

          {/* Flags */}
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_new"
                checked={form.is_new}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              New
            </label>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/admin"
              className="btn btn-outline"
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
