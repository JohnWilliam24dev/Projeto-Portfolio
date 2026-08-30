export const PRODUCT_TYPES = Object.freeze({
  GALLERY: 'gallery',
  ICON: 'icon',
});

export const PRODUCT_CATALOG = Object.freeze([
  {
    id: 'chibi',
    type: PRODUCT_TYPES.GALLERY,
    name: 'Chibi',
    description: 'TODO: escrever a descrição do produto Chibi.',
    imagePublicIds: ['chibi-main', 'chibi1', 'chibi2'],
  },
  {
    id: 'sugary',
    type: PRODUCT_TYPES.GALLERY,
    name: 'Sugary Rose',
    description: 'TODO: escrever a descrição do produto Sugary.',
    imagePublicIds: ['sugary-main', 'sugary1', 'sugary2', 'sugary3'],
  },
  {
    id: 'chibi-icon',
    type: PRODUCT_TYPES.ICON,
    name: 'Ícone Chibi',
    description: 'TODO: escrever a descrição do ícone Chibi.',
    imagePublicIds: ['chibi-icon-edit'],
  },
  {
    id: 'sugary-icon',
    type: PRODUCT_TYPES.ICON,
    name: 'Ícone Sugary',
    description: 'TODO: escrever a descrição do ícone Sugary.',
    imagePublicIds: ['sugary-icon'],
  },
]);

export function getProductById(productId) {
  return PRODUCT_CATALOG.find((product) => product.id === productId) ?? null;
}
