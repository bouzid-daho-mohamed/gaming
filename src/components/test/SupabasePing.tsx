import { useEffect } from 'react';
import { supabase }   from '../../lib/supabase';   // ← adapte le chemin si nécessaire

/**
 * Petit “ping” Supabase : s’exécute une seule fois côté client.
 * • Affiche ✅ Supabase OK en console si l’API répond
 * • Affiche l’erreur reçue sinon
 */
const SupabasePing = () => {
  useEffect(() => {
    (async () => {
      const { error } = await supabase
        .from('products')      // ← table la plus simple à lire
        .select('id')
        .limit(1);

      if (error) {
        console.error('❌ Supabase KO', error);
      } else {
        console.info('✅ Supabase OK');
      }
    })();
  }, []);

  return null;                 // rien à afficher
};

export default SupabasePing;
