const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

export const commissionApiUrl = configuredApiBaseUrl
  ? `${configuredApiBaseUrl}/api/commission`
  : '/api/commission';
