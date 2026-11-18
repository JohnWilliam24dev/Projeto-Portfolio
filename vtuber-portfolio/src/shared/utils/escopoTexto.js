const CABECALHO_FAZ = 'Faço:';
const CABECALHO_NAO_FAZ = 'Não faço:';

/**
 * Decodifica o campo `facoENaoFaco` da API (mesmo formato produzido pelo SGA em `escopo_texto.dart`)
 * para duas listas (`faz` e `naoFaz`). Caso o texto não siga o formato estruturado, mantém o conteúdo
 * em `faz` para nunca perder informação editada manualmente.
 */
export function decodificarEscopo(texto) {
  const limpo = (texto ?? '').trim();
  if (!limpo) return { faz: [], naoFaz: [] };

  const faz = [];
  const naoFaz = [];
  let atual = null;
  let estruturado = false;

  for (const linhaBruta of limpo.split('\n')) {
    const linha = linhaBruta.trim();
    if (linha === CABECALHO_FAZ) {
      atual = faz;
      estruturado = true;
    } else if (linha === CABECALHO_NAO_FAZ) {
      atual = naoFaz;
      estruturado = true;
    } else if (atual !== null && linha.startsWith('- ')) {
      const item = linha.slice(2).trim();
      if (item) atual.push(item);
    } else if (atual !== null && linha) {
      atual.push(linha);
    }
  }

  if (estruturado) {
    return { faz, naoFaz };
  }

  return {
    faz: limpo
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean),
    naoFaz: [],
  };
}
