import { apiClient, apiConfig, extractApiErrorMessage, hasMakerConfigured } from '../../../core/config/apiClient';

const DEFAULT_PAGE_LIMIT = 50;
const cachedPages = new Map();

function normalizeProduct(item) {
  return {
    id: item.id,
    name: item.nome,
    description: item.descricao ?? '',
    imageUrl: item.imagemUrl,
    productType: item.tipoProduto ?? '',
    createdAt: item.criadoEm ?? '',
  };
}

export async function fetchPortfolioProducts({ limite = DEFAULT_PAGE_LIMIT, offset = 0, forceRefresh = false } = {}) {
  if (!hasMakerConfigured()) {
    throw new Error('VITE_MAKER_PUBLIC_ID não configurado.');
  }

  const cacheKey = `${limite}:${offset}`;
  if (!forceRefresh && cachedPages.has(cacheKey)) {
    return cachedPages.get(cacheKey);
  }

  try {
    const { data } = await apiClient.get(`/makers/${apiConfig.makerPublicId}/portfolio`, {
      params: { limite, offset },
    });

    const page = {
      items: Array.isArray(data.itens) ? data.itens.map(normalizeProduct) : [],
      total: Number(data.total ?? 0),
      hasMore: Boolean(data.temMais),
    };

    cachedPages.set(cacheKey, page);
    return page;
  } catch (error) {
    throw new Error(extractApiErrorMessage(error, 'Não foi possível carregar os produtos do portfólio.'));
  }
}

export function findCachedProductById(productId) {
  for (const page of cachedPages.values()) {
    const match = page.items.find((item) => item.id === productId);
    if (match) return match;
  }
  return null;
}

/**
 * Como a API pública não possui GET /makers/:publicId/portfolio/:id, busca nas páginas
 * em cache ou percorre a paginação do portfólio até encontrar o produto pelo ID.
 */
export async function fetchPortfolioProductById(productId) {
  const cached = findCachedProductById(productId);
  if (cached) return cached;

  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const page = await fetchPortfolioProducts({ limite: DEFAULT_PAGE_LIMIT, offset });
    const found = page.items.find((item) => item.id === productId);
    if (found) return found;

    hasMore = page.hasMore;
    offset += page.items.length;
    if (page.items.length === 0) break;
  }

  return null;
}

export function clearPortfolioCache() {
  cachedPages.clear();
}
