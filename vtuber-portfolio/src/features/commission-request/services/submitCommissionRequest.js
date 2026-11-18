import { apiClient, apiConfig, extractApiErrorMessage, hasMakerConfigured } from '../../../core/config/apiClient';

export async function submitCommissionRequest(orderPayload, { catalog } = {}) {
  if (!hasMakerConfigured()) {
    return {
      success: false,
      error: 'Configuração do artista ausente (MAKER_PUBLIC_ID).',
    };
  }

  try {
    const formData = new FormData();
    formData.append('makerPublicId', apiConfig.makerPublicId);
    formData.append('nomeCliente', orderPayload.nomeCliente.trim());
    formData.append('contato', orderPayload.contato.trim());

    const email = orderPayload.email?.trim();
    if (email) {
      formData.append('email', email);
    }

    formData.append('descricao', orderPayload.descricao.trim());

    const isCatalogMode = catalog?.config?.modalidade === 'CATALOGO';
    if (isCatalogMode && orderPayload.tipoProdutoId) {
      formData.append('tipoProdutoId', orderPayload.tipoProdutoId);

      const selectedType = catalog.tipos.find((t) => t.id === orderPayload.tipoProdutoId);
      const validAddonIds = new Set((selectedType?.adicionais ?? []).map((a) => a.id));

      const adicionaisPayload = Object.entries(orderPayload.adicionais ?? {})
        .filter(([adicionalId, sel]) => validAddonIds.has(adicionalId) && Number(sel?.quantity) > 0)
        .map(([adicionalId, sel]) => ({
          adicionalId,
          quantidade: Number(sel.quantity),
          descricaoCliente: (sel.descricaoCliente ?? '').trim(),
        }));

      if (adicionaisPayload.length > 0) {
        formData.append('adicionais', JSON.stringify(adicionaisPayload));
      }
    }

    if (orderPayload.website) {
      formData.append('website', orderPayload.website);
    }

    formData.append('referenceFile', orderPayload.referenceFile);

    const { data } = await apiClient.post('/commissions', formData);

    return {
      success: true,
      token: data?.token ?? '',
    };
  } catch (error) {
    return {
      success: false,
      error: extractApiErrorMessage(error, 'Erro ao enviar o pedido.'),
    };
  }
}

export async function fetchCommissionByToken(token) {
  const normalizedToken = (token ?? '').trim().toUpperCase();
  if (!normalizedToken) {
    throw new Error('Informe o código do pedido para consultar.');
  }

  try {
    const { data } = await apiClient.get(`/commissions/token/${encodeURIComponent(normalizedToken)}`);
    return data;
  } catch (error) {
    throw new Error(extractApiErrorMessage(error, 'Pedido não encontrado.'));
  }
}
