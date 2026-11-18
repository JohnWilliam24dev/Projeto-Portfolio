import axios from 'axios';

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
const configuredMakerPublicId = import.meta.env.VITE_MAKER_PUBLIC_ID?.trim() || '';

export const apiConfig = Object.freeze({
  baseUrl: configuredApiBaseUrl,
  makerPublicId: configuredMakerPublicId,
});

export function hasMakerConfigured() {
  return Boolean(apiConfig.makerPublicId);
}

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl || undefined,
  timeout: 15000,
});

export function extractApiErrorMessage(error, fallbackMessage = 'Erro ao comunicar com o servidor.') {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data.error === 'string' && data.error.trim()) {
      return data.error;
    }
    if (error.response?.status === 429) {
      return 'Muitas tentativas em sequência. Aguarde alguns instantes e tente novamente.';
    }
    if (error.response?.status === 413) {
      return 'A imagem excede o tamanho máximo permitido (4 MB).';
    }
    if (!error.response) {
      return 'Não foi possível conectar ao servidor. Tente novamente em alguns instantes.';
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallbackMessage;
}
