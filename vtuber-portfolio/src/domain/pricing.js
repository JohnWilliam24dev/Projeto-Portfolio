export function parseMoney(value) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Calcula a simulação de preço no frontend exatamente com os valores já arredondados
 * (`precoBase` e `valorUnitario`) fornecidos por `GET /makers/:publicId/catalogo`.
 * O servidor sempre recalcula e valida o valor oficial ao gravar o pedido.
 */
export function calculateSimulatedPrice(selectedType, selectedAddons = {}) {
  if (!selectedType) return null;

  const basePrice = parseMoney(selectedType.precoBase);
  if (basePrice === null) return null;

  let addonsTotal = 0;
  for (const addon of selectedType.adicionais ?? []) {
    const selection = selectedAddons[addon.id];
    const quantity = Number(selection?.quantity) || 0;
    if (quantity <= 0) continue;

    const unitPrice = parseMoney(addon.valorUnitario);
    if (unitPrice === null) return null;

    addonsTotal += unitPrice * quantity;
  }

  return {
    basePrice,
    addonsTotal,
    total: basePrice + addonsTotal,
  };
}

export function formatCurrencyBRL(value) {
  const numeric = typeof value === 'number' ? value : parseMoney(value);
  if (numeric === null) return '—';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numeric);
}
