import { useCallback, useEffect, useState } from 'react';
import { fetchPortfolioProducts } from '../services/portfolioService';

const PAGE_SIZE = 50;

export function usePortfolioProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadInitial = useCallback(async ({ forceRefresh = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const page = await fetchPortfolioProducts({ limite: PAGE_SIZE, offset: 0, forceRefresh });
      setProducts(page.items);
      setTotal(page.total);
      setHasMore(page.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchPortfolioProducts({ limite: PAGE_SIZE, offset: 0 })
      .then((page) => {
        if (!active) return;
        setProducts(page.items);
        setTotal(page.total);
        setHasMore(page.hasMore);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar os produtos.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const page = await fetchPortfolioProducts({ limite: PAGE_SIZE, offset: products.length });
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const nextItems = page.items.filter((item) => !existingIds.has(item.id));
        return [...prev, ...nextItems];
      });
      setTotal(page.total);
      setHasMore(page.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mais produtos.');
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, products.length]);

  return {
    products,
    total,
    hasMore,
    loading,
    loadingMore,
    error,
    loadMore,
    reload: () => loadInitial({ forceRefresh: true }),
  };
}
