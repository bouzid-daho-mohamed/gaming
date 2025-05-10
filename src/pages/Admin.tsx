// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

// 1) Type Supabase
type DBProduct = Database['public']['Tables']['products']['Row'];

// 2) Type local: override images/colors to arrays
type Product = Omit<DBProduct, 'images' | 'colors'> & {
  images: string[];
  colors: string[];
};

// 3) Interface pour le formulaire
interface ColorImageField {
  color: string;
  imageUrl: string;
  isPrimary: boolean;
}

// 4) Validation URL
const validateImageUrl = (url: string): boolean => {
  try { new URL(url); return true; } catch { return false; }
};

const Admin: React.FC = () => {
  // 5) State
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [colorImageFields, setColorImageFields] = useState<ColorImageField[]>([]);

  // 6) Charge produits
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, images, colors')
        .order('created_at', { ascending: false });
      if (error) throw error;

      const rows = (data ?? []) as DBProduct[];
      const formatted = rows.map(p => {
        // parse images
        const rawImgs = (p as any).images;
        let imgs: string[] = Array.isArray(rawImgs) ? rawImgs : [];
        if (!Array.isArray(rawImgs) && typeof rawImgs === 'string') {
          try { const parsed = JSON.parse(rawImgs); if (Array.isArray(parsed)) imgs = parsed; } catch {}
        }
        // parse colors
        const rawCols = (p as any).colors;
        let cols: string[] = Array.isArray(rawCols) ? rawCols : [];
        if (!Array.isArray(rawCols) && typeof rawCols === 'string') {
          try { const parsed = JSON.parse(rawCols); if (Array.isArray(parsed)) cols = parsed; } catch {}
        }
        return { ...p, images: imgs, colors: cols } as Product;
      });
      setProducts(formatted);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage(`Erreur de chargement : ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { fetchProducts(); }, []);

  // 7) Supprimer
  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer définitivement ce produit ?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setErrorMessage(`Échec de la suppression : ${err.message}`);
    }
  };

  // 8) Edit
  const handleEdit = (product: Product) => {
    const primaryImg = product.image;
    const fields = product.colors.map((color, idx) => ({
      color,
      imageUrl: product.images[idx] ?? product.image,
      isPrimary: product.images[idx] === primaryImg
    }));
    if (!fields.some(f => f.isPrimary) && fields.length) fields[0].isPrimary = true;
    setColorImageFields(fields);
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // 9) Change de champ
  const handleFieldChange = (i: number, field: 'color' | 'imageUrl', value: string) => {
    setColorImageFields(f => {
      const copy = [...f]; copy[i][field] = value; return copy;
    });
  };

  // 10) Sélection principale
  const handlePrimarySelect = (i: number) => {
    setColorImageFields(f => f.map((x, idx) => ({ ...x, isPrimary: idx === i })));
  };

  // 11) Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setErrorMessage(null);
    if (!colorImageFields.every(f => validateImageUrl(f.imageUrl))) {
      setErrorMessage('URL d’image invalide'); return;
    }
    const mainImg = colorImageFields.find(f => f.isPrimary)?.imageUrl || colorImageFields[0]?.imageUrl || '';
    const formData = {
      name:        (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      category:    (e.currentTarget.elements.namedItem('category') as HTMLSelectElement).value,
      price:       parseFloat((e.currentTarget.elements.namedItem('price') as HTMLInputElement).value),
      description: (e.currentTarget.elements.namedItem('description') as HTMLTextAreaElement).value,
      featured:    (e.currentTarget.elements.namedItem('featured') as HTMLInputElement).checked,
      is_new:      (e.currentTarget.elements.namedItem('is_new') as HTMLInputElement).checked,
      colors:      colorImageFields.map(f => f.color),
      images:      colorImageFields.map(f => f.imageUrl),
      image:       mainImg,
    };
    try {
      if (editingProduct) await supabase.from('products').update(formData).eq('id', editingProduct.id);
      else await supabase.from('products').insert([formData]);
      await fetchProducts();
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMessage(`Échec de l’enregistrement : ${err.message}`);
    }
  };

  // 12) Loading
  if (isLoading) return (
    <div className="pt-24 pb-16"><div className="container text-center">Chargement en cours...</div></div>
  );

  // 13) Rendu
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Administration</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setColorImageFields([{ color: '', imageUrl: '', isPrimary: true }]);
              setIsModalOpen(true);
            }}
            className="btn btn-primary flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />Ajouter un produit
          </button>
        </div>

        {/* Erreur */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Image','Nom','Catégorie','Prix','Statut','Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={p.image} alt={p.name} className="h-16 w-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{p.price.toFixed(2)}€</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {p.is_new && <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Nouveau</span>}
                        {p.featured && <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">En vedette</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-4">
                      <button onClick={() => handleEdit(p)} className="text-primary-600 hover:text-primary-900"><Edit2 size={18}/></button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">{editingProduct ? 'Modifier' : 'Nouveau'} produit</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Champs de base */}
                <div>
                  <label className="block text-sm font-medium mb-1">Nom du produit</label>
                  <input name="name" type="text" required defaultValue={editingProduct?.name ?? ''} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie</label>
                  <select name="category" required defaultValue={editingProduct?.category ?? ''} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary-300">
                    <option value="">-- Sélectionner --</option>
                    <option value="playstation">PlayStation</option>
                    <option value="xbox">Xbox</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="accessories">Accessoires</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Prix</label>
                  <input name="price" type="number" step="0.01" required defaultValue={editingProduct?.price ?? ''} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea name="description" rows={4} required defaultValue={editingProduct?.description ?? ''} className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary-300"></textarea>
                </div>
                {/* Couleurs & Images */}
                <div>
                  <label className="block text-sm font-medium mb-1">Couleurs & Images</label>
                  {colorImageFields.map((field, i) => (
                    <div key={i} className="flex items-center gap-4 mb-2">
                      <input type="radio" name="primary" checked={field.isPrimary} onChange={() => handlePrimarySelect(i)} className="form-radio h-4 w-4" />
                      <input type="text" placeholder="Couleur" value={field.color} onChange={e => handleFieldChange(i, 'color', e.target.value)} className="px-4 py-2 border rounded flex-1" />
                      <input type="text" placeholder="URL Image" value={field.imageUrl} onChange={e => handleFieldChange(i, 'imageUrl', e.target.value)} className="px-4 py-2 border rounded flex-2" />
                      <button type="button" onClick={() => setColorImageFields(f => f.filter((_, idx) => idx !== i))} className="text-red-600">Supprimer</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setColorImageFields(f => [...f, { color: '', imageUrl: '', isPrimary: false }])} className="text-blue-600">+ Ajouter une couleur</button>
                </div>
                {/* Options */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={editingProduct?.featured} className="form-checkbox h-4 w-4" /> En vedette</label>
                  <label className="flex items-center gap-2"><input type="checkbox" name="is_new" defaultChecked={editingProduct?.is_new} className="form-checkbox h-4 w-4" /> Nouveau produit</label>
                </div>
                {/* Actions */}
                <div className="flex justify-end gap-4 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
