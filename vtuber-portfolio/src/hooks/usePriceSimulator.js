import { useMemo } from 'react';
import { calculateSimulatedPrice } from '../domain/pricing';

export function usePriceSimulator(modelType, acessorios, expressoesExtras) {
  return useMemo(
    () => calculateSimulatedPrice(modelType, { acessorios, expressoesExtras }),
    [modelType, acessorios, expressoesExtras]
  );
}
