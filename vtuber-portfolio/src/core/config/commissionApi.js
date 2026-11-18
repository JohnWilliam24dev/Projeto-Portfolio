import { apiConfig } from './apiClient';

export const commissionApiUrl = apiConfig.baseUrl
  ? `${apiConfig.baseUrl}/commissions`
  : '/commissions';
