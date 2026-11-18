const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REFERENCE_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_REFERENCE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_DESCRICAO_LENGTH = 1000;
const MAX_ADICIONAIS_POR_PEDIDO = 20;
const MAX_QUANTIDADE_ADICIONAL = 20;

export function validateContactStep(data) {
  const errors = {};

  const nome = data.nomeCliente?.trim() ?? '';
  if (!nome) {
    errors.nomeCliente = 'Conta pra gente como prefere ser chamado(a).';
  } else if (nome.length > 80) {
    errors.nomeCliente = 'O nome pode ter no máximo 80 caracteres.';
  }

  const contato = data.contato?.trim() ?? '';
  if (!contato) {
    errors.contato = 'Informe pelo menos um contato (Instagram, Discord, telefone etc.).';
  } else if (contato.length > 160) {
    errors.contato = 'O contato pode ter no máximo 160 caracteres.';
  }

  const email = data.email?.trim() ?? '';
  if (email) {
    if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      errors.email = 'Esse e-mail não parece válido. Confira o formato.';
    }
  }

  return errors;
}

export function validateModelStep(data, catalog) {
  const errors = {};
  if (catalog?.config?.modalidade === 'CATALOGO') {
    if (!data.tipoProdutoId) {
      errors.tipoProdutoId = 'Escolha um tipo de modelo para continuar.';
    }
  }
  return errors;
}

export function validateAdditionalContentStep(data, selectedType) {
  const errors = {};

  const descricao = data.descricao?.trim() ?? '';
  if (!descricao) {
    errors.descricao = 'Descreva o que você deseja no seu pedido.';
  } else if (descricao.length > MAX_DESCRICAO_LENGTH) {
    errors.descricao = `A descrição pode ter no máximo ${MAX_DESCRICAO_LENGTH} caracteres.`;
  }

  const validIds = new Set((selectedType?.adicionais ?? []).map((a) => a.id));
  const selectedEntries = Object.entries(data.adicionais ?? {}).filter(
    ([id, sel]) => validIds.has(id) && Number(sel?.quantity) > 0
  );

  if (selectedEntries.length > MAX_ADICIONAIS_POR_PEDIDO) {
    errors.adicionais = `Selecione no máximo ${MAX_ADICIONAIS_POR_PEDIDO} adicionais.`;
  }

  const addonErrors = {};
  for (const [id, sel] of selectedEntries) {
    const qty = Number(sel.quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QUANTIDADE_ADICIONAL) {
      addonErrors[id] = `Quantidade entre 1 e ${MAX_QUANTIDADE_ADICIONAL}.`;
      continue;
    }
    const desc = (sel.descricaoCliente ?? '').trim();
    if (!desc) {
      addonErrors[id] = 'Descreva o que deseja neste adicional.';
    } else if (desc.length > 500) {
      addonErrors[id] = 'A descrição do adicional pode ter no máximo 500 caracteres.';
    }
  }

  if (Object.keys(addonErrors).length > 0) {
    errors.addonErrors = addonErrors;
  }

  return errors;
}

export function validateReferenceStep(data) {
  const errors = {};
  if (!data.referenceFile) {
    errors.referenceFile = 'Envie ao menos uma referência (imagem) do modelo desejado.';
  } else if (!ALLOWED_REFERENCE_TYPES.has(data.referenceFile.type)) {
    errors.referenceFile = 'Use uma imagem PNG, JPEG ou WebP.';
  } else if (data.referenceFile.size > MAX_REFERENCE_FILE_SIZE) {
    errors.referenceFile = 'A imagem pode ter no máximo 4 MB.';
  }
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
