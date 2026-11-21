import { apiClient, apiConfig, extractApiErrorMessage, hasMakerConfigured } from '../../../core/config/apiClient';

let cachedMakerProfile = null;
let inflightMakerRequest = null;

export async function fetchPublicMakerProfile({ forceRefresh = false } = {}) {
  if (!hasMakerConfigured()) {
    throw new Error('MAKER_PUBLIC_ID não configurado.');
  }

  if (!forceRefresh && cachedMakerProfile) {
    return cachedMakerProfile;
  }

  if (!forceRefresh && inflightMakerRequest) {
    return inflightMakerRequest;
  }

  inflightMakerRequest = apiClient
    .get(`/makers/${apiConfig.makerPublicId}`)
    .then(({ data }) => {
      const profile = {
        publicId: data.publicId,
        nome: data.nome ?? '',
        termosCondicoes: data.termosCondicoes ?? null,
        // O contrato público fornece as listas já limpas e na ordem do artista.
        faco: Array.isArray(data.faco) ? data.faco : [],
        naoFaco: Array.isArray(data.naoFaco) ? data.naoFaco : [],
      };
      cachedMakerProfile = profile;
      return profile;
    })
    .catch((error) => {
      throw new Error(extractApiErrorMessage(error, 'Não foi possível carregar os dados do artista.'));
    })
    .finally(() => {
      inflightMakerRequest = null;
    });

  return inflightMakerRequest;
}

export function clearMakerProfileCache() {
  cachedMakerProfile = null;
}
