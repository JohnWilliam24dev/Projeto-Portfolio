import { apiClient, apiConfig, extractApiErrorMessage, hasMakerConfigured } from '../../../core/config/apiClient';
import { decodificarEscopo } from '../../../shared/utils/escopoTexto';

let cachedMakerProfile = null;
let inflightMakerRequest = null;

export async function fetchPublicMakerProfile({ forceRefresh = false } = {}) {
  if (!hasMakerConfigured()) {
    throw new Error('VITE_MAKER_PUBLIC_ID não configurado.');
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
      const escopo = decodificarEscopo(data.facoENaoFaco);
      const profile = {
        publicId: data.publicId,
        nome: data.nome ?? '',
        termosCondicoes: data.termosCondicoes ?? null,
        facoENaoFaco: data.facoENaoFaco ?? null,
        faz: escopo.faz,
        naoFaz: escopo.naoFaz,
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
