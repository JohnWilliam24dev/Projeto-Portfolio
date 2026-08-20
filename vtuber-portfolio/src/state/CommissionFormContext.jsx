import { createContext, useContext, useReducer, useMemo } from 'react';
import { commissionFormReducer, initialCommissionFormState } from './commissionFormReducer';

const CommissionFormContext = createContext(null);

export function CommissionFormProvider({ children }) {
  const [state, dispatch] = useReducer(commissionFormReducer, initialCommissionFormState);

  // useMemo evita recriar o objeto de contexto (e re-renderizar todos os
  // consumidores) a cada render do provider.
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CommissionFormContext.Provider value={value}>{children}</CommissionFormContext.Provider>
  );
}

/**
 * Hook de acesso ao contexto do formulário. Lança erro cedo se usado
 * fora do provider — evita bugs silenciosos de "state undefined".
 */
export function useCommissionFormContext() {
  const context = useContext(CommissionFormContext);
  if (!context) {
    throw new Error('useCommissionFormContext deve ser usado dentro de <CommissionFormProvider>');
  }
  return context;
}
