/**
 * Camada de serviço para envio de pedidos de comissão.
 *
 * Hoje não existe backend, então `submitOrder` só simula uma chamada
 * assíncrona e loga o payload no console. Quando o backend existir,
 * basta reescrever o CORPO desta função (ex.: um fetch/axios para a API)
 * — nenhum componente que a chama precisa mudar (Dependency Inversion:
 * a UI depende desta função, não de "como" o envio é feito).
 *
 * @param {object} orderPayload - dados completos coletados no wizard
 * @returns {Promise<{ success: boolean, orderId?: string, error?: string }>}
 */
export async function submitOrder(orderPayload) {
  try {
    // TODO(backend): trocar por uma chamada real, por exemplo:
    // const response = await fetch('/api/orders', {
    //   method: 'POST',
    //   body: buildFormData(orderPayload),
    // });
    // if (!response.ok) throw new Error('Falha ao enviar pedido');
    // const data = await response.json();
    // return { success: true, orderId: data.id };

    console.info('[orderService] Pedido recebido (modo local, sem backend):', orderPayload);

    await simulateNetworkDelay();

    const fakeOrderId = `local-${Date.now()}`;
    return { success: true, orderId: fakeOrderId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function simulateNetworkDelay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
