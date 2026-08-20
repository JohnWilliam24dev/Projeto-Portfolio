import { getModelById } from './modelTypes';

export const ADDONS = Object.freeze({
  ACESSORIOS: {
    id: 'acessorios',
    label: 'Acessórios (chifres, enfeites no cabelo, roupas extras etc.)',
    percentPerUnit: 0.1,
  },
  EXPRESSOES_EXTRAS: {
    id: 'expressoesExtras',
    label: 'Expressões extras',
    percentPerUnit: 0.05,
  },
});

export function calculateSimulatedPrice(modelId, addonQuantities = {}) {
  const model = getModelById(modelId);
  if (!model) return null;

  const acessorios = Number(addonQuantities.acessorios) || 0;
  const expressoesExtras = Number(addonQuantities.expressoesExtras) || 0;

  const acessoriosValue =
    model.basePrice * ADDONS.ACESSORIOS.percentPerUnit * Math.max(0, acessorios);
  const expressoesValue =
    model.basePrice * ADDONS.EXPRESSOES_EXTRAS.percentPerUnit * Math.max(0, expressoesExtras);

  const addonsTotal = acessoriosValue + expressoesValue;

  return {
    basePrice: model.basePrice,
    addonsTotal,
    total: model.basePrice + addonsTotal,
  };
}

export function formatCurrencyBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
