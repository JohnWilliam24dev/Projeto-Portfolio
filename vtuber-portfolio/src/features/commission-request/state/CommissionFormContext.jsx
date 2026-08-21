import { createContext, useContext, useReducer, useMemo } from 'react';
import { commissionFormReducer, initialCommissionFormState } from './commissionFormReducer';

const CommissionFormContext = createContext(null);

export function CommissionFormProvider({ children }) {
  const [state, dispatch] = useReducer(commissionFormReducer, initialCommissionFormState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CommissionFormContext.Provider value={value}>{children}</CommissionFormContext.Provider>
  );
}

export function useCommissionFormContext() {
  const context = useContext(CommissionFormContext);
  if (!context) {
    throw new Error('useCommissionFormContext deve ser usado dentro de <CommissionFormProvider>');
  }
  return context;
}
