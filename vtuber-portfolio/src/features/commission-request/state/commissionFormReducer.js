export const TOTAL_STEPS = 5;

export const initialCommissionFormState = {
  currentStep: 0,
  isSubmitting: false,
  submitError: null,
  data: {
    nomeCliente: '',
    contato: '',
    email: '',
    tipoProdutoId: '',
    descricao: '',
    adicionais: {},
    referenceFile: null,
    website: '',
  },
};

export const commissionFormActions = Object.freeze({
  UPDATE_FIELD: 'UPDATE_FIELD',
  UPDATE_ADDON: 'UPDATE_ADDON',
  RESET_ADDONS: 'RESET_ADDONS',
  GO_NEXT: 'GO_NEXT',
  GO_BACK: 'GO_BACK',
  GO_TO_STEP: 'GO_TO_STEP',
  SUBMIT_START: 'SUBMIT_START',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  SUBMIT_ERROR: 'SUBMIT_ERROR',
  RESET: 'RESET',
});

const {
  UPDATE_FIELD,
  UPDATE_ADDON,
  RESET_ADDONS,
  GO_NEXT,
  GO_BACK,
  GO_TO_STEP,
  SUBMIT_START,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR,
  RESET,
} = commissionFormActions;

export function commissionFormReducer(state, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };

    case UPDATE_ADDON: {
      const { adicionalId, quantity, descricaoCliente } = action;
      const current = state.data.adicionais[adicionalId] ?? { quantity: 0, descricaoCliente: '' };
      const nextQty = quantity !== undefined ? quantity : current.quantity;
      const nextDesc = descricaoCliente !== undefined ? descricaoCliente : current.descricaoCliente;

      const nextAdicionais = { ...state.data.adicionais };
      if (nextQty <= 0) {
        delete nextAdicionais[adicionalId];
      } else {
        nextAdicionais[adicionalId] = {
          quantity: nextQty,
          descricaoCliente: nextDesc,
        };
      }

      return {
        ...state,
        data: { ...state.data, adicionais: nextAdicionais },
      };
    }

    case RESET_ADDONS:
      return {
        ...state,
        data: { ...state.data, adicionais: {} },
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
