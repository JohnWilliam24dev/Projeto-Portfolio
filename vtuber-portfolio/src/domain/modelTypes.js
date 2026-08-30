export const MODEL_TYPES = Object.freeze({
  CHIBI: 'chibi',
  BASICO: 'basico',
  MEDIO: 'medio',
  OUTROS: 'outros',
});

export const MODEL_CATALOG = Object.freeze([
  {
    id: MODEL_TYPES.CHIBI,
    label: 'Modelo Chibi 3D',
    description: 'Proporções chibi, expressivo e mais compacto de produzir.',
    basePrice: 320.0,
  },
  {
    id: MODEL_TYPES.BASICO,
    label: 'Modelo Básico 3D',
    description: 'Proporções realistas simplificadas, bom custo-benefício.',
    basePrice: 490.0,
  },
  {
    id: MODEL_TYPES.MEDIO,
    label: 'Modelo Médio 3D',
    description: 'Nível de detalhe intermediário, mais riqueza visual.',
    basePrice: 690.0,
  },
  {
    id: MODEL_TYPES.OUTROS,
    label: 'Outros',
    description: 'Não encontrou o que procura? Descreva sua ideia no próximo passo.',
    basePrice: null,
  },
]);

export function getModelById(modelId) {
  return MODEL_CATALOG.find((model) => model.id === modelId) ?? null;
}
