import { useCallback } from 'react';
import { useCommissionFormContext } from '../state/CommissionFormContext';
import { TOTAL_STEPS, commissionFormActions } from '../state/commissionFormReducer';

export function useCommissionForm() {
  const { state, dispatch } = useCommissionFormContext();

  const updateField = useCallback(
    (field, value) => dispatch({ type: commissionFormActions.UPDATE_FIELD, field, value }),
    [dispatch]
  );

  const goNext = useCallback(() => dispatch({ type: commissionFormActions.GO_NEXT }), [dispatch]);
  const goBack = useCallback(() => dispatch({ type: commissionFormActions.GO_BACK }), [dispatch]);
  const goToStep = useCallback(
    (step) => dispatch({ type: commissionFormActions.GO_TO_STEP, step }),
    [dispatch]
  );

  return {
    data: state.data,
    currentStep: state.currentStep,
    totalSteps: TOTAL_STEPS,
    isFirstStep: state.currentStep === 0,
    isLastStep: state.currentStep === TOTAL_STEPS - 1,
    isSubmitting: state.isSubmitting,
    submitError: state.submitError,
    updateField,
    goNext,
    goBack,
    goToStep,
  };
}
