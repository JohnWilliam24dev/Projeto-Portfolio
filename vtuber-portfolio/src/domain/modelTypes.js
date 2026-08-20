/**
 * Catálogo de modelos VTuber disponíveis para comissão.
 *
 * Mantido separado da UI: se um preço mudar ou um novo modelo for criado,
 * a alteração acontece só aqui — nenhum componente precisa ser tocado
 * (Single Responsibility + Open/Closed).
 */

export const MODEL_TYPES = Object.freeze({
  CHIBI: 'chibi',
  BASICO: 'basico',
  MEDIO: 'medio',
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
]);

export function getModelById(modelId) {
  return MODEL_CATALOG.find((model) => model.id === modelId) ?? null;
}
