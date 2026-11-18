import { useMemo } from 'react';
import { calculateSimulatedPrice } from '../../../domain/pricing';

export function usePriceSimulator(selectedType, selectedAddons, showPrices = true) {
  return useMemo(() => {
    if (!showPrices || !selectedType) return null;
    return calculateSimulatedPrice(selectedType, selectedAddons);
  }, [selectedType, selectedAddons, showPrices]);
}
