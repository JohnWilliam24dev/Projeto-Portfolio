import { useMemo } from 'react';
import { calculateSimulatedPrice } from '../domain/pricing';

/**
 * Deriva o preço simulado a partir do modelo e das quantidades de
 * adicionais. useMemo evita recalcular a cada render se os inputs
 * relevantes não mudaram.
 */
export function usePriceSimulator(modelType, acessorios, expressoesExtras) {
  return useMemo(
    () => calculateSimulatedPrice(modelType, { acessorios, expressoesExtras }),
    [modelType, acessorios, expressoesExtras]
  );
}
