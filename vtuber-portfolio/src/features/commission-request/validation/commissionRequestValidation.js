const CONTACT_REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  instagram: /^@?[\w.]{1,30}$/,
  discord: /^.{2,32}#?\d{0,4}$/,
};

const MAX_REFERENCE_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_REFERENCE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export function validateContactStep(data) {
  const errors = {};

  if (!data.nickname?.trim()) {
    errors.nickname = 'Conta pra gente como prefere ser chamado(a).';
  }

  const contact = data.contact?.trim() ?? '';
  if (!contact) {
    errors.contact = 'Informe pelo menos um contato (e-mail, Instagram ou Discord).';
  } else {
    const isValid =
      CONTACT_REGEX.email.test(contact) ||
      CONTACT_REGEX.instagram.test(contact) ||
      CONTACT_REGEX.discord.test(contact);
    if (!isValid) {
      errors.contact = 'Esse contato não parece válido. Confira o formato.';
    }
  }

  return errors;
}

export function validateModelStep(data) {
  const errors = {};
  if (!data.modelType) {
    errors.modelType = 'Escolha um tipo de modelo para continuar.';
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
    errors.referenceFile = 'A imagem pode ter no máximo 5 MB.';
  }
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
