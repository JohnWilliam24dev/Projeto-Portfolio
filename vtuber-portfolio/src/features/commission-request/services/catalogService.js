import { apiClient, apiConfig, extractApiErrorMessage, hasMakerConfigured } from '../../../core/config/apiClient';

let cachedCatalog = null;
let inflightCatalogRequest = null;

export async function fetchPublicCatalog({ forceRefresh = false } = {}) {
  if (!hasMakerConfigured()) {
    throw new Error('MAKER_PUBLIC_ID não configurado.');
  }

  if (!forceRefresh && cachedCatalog) {
    return cachedCatalog;
  }

  if (!forceRefresh && inflightCatalogRequest) {
    return inflightCatalogRequest;
  }

  inflightCatalogRequest = apiClient
    .get(`/makers/${apiConfig.makerPublicId}/catalogo`)
    .then(({ data }) => {
      const catalog = {
        config: {
          modalidade: data?.config?.modalidade === 'MANUAL' ? 'MANUAL' : 'CATALOGO',
          exibirValores: Boolean(data?.config?.exibirValores),
        },
        tipos: Array.isArray(data?.tipos) ? data.tipos : [],
      };
      cachedCatalog = catalog;
      return catalog;
    })
    .catch((error) => {
      throw new Error(extractApiErrorMessage(error, 'Não foi possível carregar o catálogo do artista.'));
    })
    .finally(() => {
      inflightCatalogRequest = null;
    });

  return inflightCatalogRequest;
}

export function clearCatalogCache() {
  cachedCatalog = null;
}
