import { commissionApiUrl } from '../../../core/config/commissionApi';

export async function submitCommissionRequest(orderPayload) {
  try {
    const formData = new FormData();
    formData.append('nickname', orderPayload.nickname.trim());
    formData.append('contact', orderPayload.contact.trim());
    formData.append('modelType', orderPayload.modelType);
    formData.append('additionalContentNotes', orderPayload.additionalContentNotes.trim());
    formData.append('acessorios', String(orderPayload.acessorios));
    formData.append('expressoesExtras', String(orderPayload.expressoesExtras));
    formData.append('referenceFile', orderPayload.referenceFile);

    const response = await fetch(commissionApiUrl, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { success: false, error: result.error || 'Erro ao enviar o pedido.' };
    }

    return { success: true, orderId: result.orderId };
  } catch {
    return {
      success: false,
      error: 'Não foi possível conectar ao servidor. Tente novamente em alguns instantes.',
    };
  }
}
