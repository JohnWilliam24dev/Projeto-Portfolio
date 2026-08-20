import { getModelById } from './modelTypes';

/**
 * Regras de precificação dos adicionais.
 * Cada item é um percentual aplicado sobre o preço base do modelo,
 * multiplicado pela quantidade informada pelo usuário.
 *
 * Adicionar um novo adicional = adicionar uma entrada aqui.
 * Nenhum componente de UI precisa saber como o preço é calculado
 * (Open/Closed Principle).
 */
export const ADDONS = Object.freeze({
  ACESSORIOS: {
    id: 'acessorios',
    label: 'Acessórios (chifres, enfeites no cabelo, roupas extras etc.)',
    percentPerUnit: 0.1, // +10% por unidade
  },
  EXPRESSOES_EXTRAS: {
    id: 'expressoesExtras',
    label: 'Expressões extras',
    percentPerUnit: 0.05, // +5% por unidade
  },
});

/**
 * Calcula o preço simulado a partir do modelo escolhido e das quantidades
 * de cada adicional.
 *
 * @param {string} modelId - id do modelo (ver MODEL_TYPES)
 * @param {{ acessorios?: number, expressoesExtras?: number }} addonQuantities
 * @returns {{ basePrice: number, addonsTotal: number, total: number } | null}
 */
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
