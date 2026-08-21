export async function submitCommissionRequest(orderPayload) {
  try {
    console.info('[submitCommissionRequest] Pedido recebido (modo local, sem backend):', orderPayload);

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
