export const TOTAL_STEPS = 5; // 4 forms + resumo

export const initialCommissionFormState = {
  currentStep: 0,
  isSubmitting: false,
  submitError: null,
  data: {
    // Form 1
    nickname: '',
    contact: '',
    // Form 2
    modelType: '',
    // Form 3
    additionalContentNotes: '',
    acessorios: 0,
    expressoesExtras: 0,
    // Form 4
    referenceFile: null,
  },
};

export const commissionFormActions = Object.freeze({
  UPDATE_FIELD: 'UPDATE_FIELD',
  GO_NEXT: 'GO_NEXT',
  GO_BACK: 'GO_BACK',
  GO_TO_STEP: 'GO_TO_STEP',
  SUBMIT_START: 'SUBMIT_START',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  SUBMIT_ERROR: 'SUBMIT_ERROR',
  RESET: 'RESET',
});

const { UPDATE_FIELD, GO_NEXT, GO_BACK, GO_TO_STEP, SUBMIT_START, SUBMIT_SUCCESS, SUBMIT_ERROR, RESET } =
  commissionFormActions;

export function commissionFormReducer(state, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };

    case GO_NEXT:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
      };

    case GO_BACK:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case GO_TO_STEP:
      return {
        ...state,
        currentStep: Math.min(Math.max(action.step, 0), TOTAL_STEPS - 1),
      };

    case SUBMIT_START:
      return { ...state, isSubmitting: true, submitError: null };

    case SUBMIT_SUCCESS:
      return { ...state, isSubmitting: false };

    case SUBMIT_ERROR:
      return { ...state, isSubmitting: false, submitError: action.error };

    case RESET:
      return initialCommissionFormState;

    default:
      return state;
  }
}
