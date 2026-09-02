export const PRODUCT_TYPES = Object.freeze({
  GALLERY: 'gallery',
  ICON: 'icon',
});

export const PRODUCT_CATALOG = Object.freeze([
  {
    id: 'chibi',
    type: PRODUCT_TYPES.GALLERY,
    name: 'Chibi Model — Purple Butterfly',
    description:
      'Uma garota fofa inspirada em borboletas roxas, com um design delicado e encantador. Possui olhos grandes e expressivos na cor roxa, cabelos em tons azulados e um vestido preto e roxo com detalhes que remetem à estética das borboletas. O visual é completado por sapatilhas pretas, dando ao modelo uma aparência simples, elegante e adorável.',
    imagePublicIds: ['chibi-main', 'chibi1', 'chibi2'],
  },
  {
    id: 'sugary',
    type: PRODUCT_TYPES.GALLERY,
    name: 'Sugary Rose — Simple Model',
    description:
      'Uma jovem adulta de aparência doce e delicada, com cabelos rosa e olhos em um tom de rosa escuro, quase vinho. Ela veste um confortável pijama amarelo acompanhado de adoráveis pantufas de pato. Para completar o visual, possui orelhas de coelho e um laço na cabeça, trazendo uma estética fofa, aconchegante e divertida ao modelo.',
    imagePublicIds: ['sugary-main', 'sugary1', 'sugary2', 'sugary3'],
  },
  {
    id: 'chibi-icon',
    type: PRODUCT_TYPES.ICON,
    name: 'Chibi Icon Halfbody',
    description:
      'Uma garota fofa em estilo chibi, com olhos grandes e expressivos na cor roxa e cabelos em tons azulados. Ela veste um delicado vestido preto e roxo, acompanhado de sapatilhas pretas. Um design simples e encantador, com uma estética fofa e um toque delicado de fantasia.',
    imagePublicIds: ['chibi-icon-edit'],
  },
  {
    id: 'sugary-icon',
    type: PRODUCT_TYPES.ICON,
    name: 'Sugary Rose — Versão Humana',
    description:
      'Uma representação da Sugary Rose em sua versão humana, apresentando uma aparência jovem e delicada. Possui cabelos rosa, olhos em um tom de rosa escuro quase vinho e veste um confortável pijama amarelo acompanhado de pantufas de pato. Um design simples, fofo e aconchegante, focado na personalidade doce da personagem.',
    imagePublicIds: ['sugary-icon'],
  },
]);

export function getProductById(productId) {
  return PRODUCT_CATALOG.find((product) => product.id === productId) ?? null;
}
