import { useCallback, useEffect, useState } from 'react';
import { fetchPublicCatalog } from '../services/catalogService';

export function usePublicCatalog() {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async ({ forceRefresh = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicCatalog({ forceRefresh });
      setCatalog(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar o catálogo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchPublicCatalog()
      .then((data) => {
        if (active) setCatalog(data);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar o catálogo.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    catalog,
    loading,
    error,
    reload: () => load({ forceRefresh: true }),
  };
}
