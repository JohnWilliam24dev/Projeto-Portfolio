import { useEffect, useState } from 'react';
import { fetchPublicMakerProfile } from '../services/makerService';

export function useMakerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async ({ forceRefresh = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicMakerProfile({ forceRefresh });
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados do artista.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    fetchPublicMakerProfile()
      .then((data) => {
        if (active) setProfile(data);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar dados do artista.');
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
    profile,
    loading,
    error,
    reload: () => load({ forceRefresh: true }),
  };
}
