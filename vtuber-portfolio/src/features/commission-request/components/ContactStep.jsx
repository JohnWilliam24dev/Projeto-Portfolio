import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { validateContactStep, hasErrors } from '../validation/commissionRequestValidation';

export default function ContactStep() {
  const { data, updateField, goNext } = useCommissionForm();
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const validationErrors = validateContactStep(data);
    setErrors(validationErrors);
    setTouched(true);
    if (!hasErrors(validationErrors)) goNext();
  };

  return (
    <StepCard
      title="Como gostaria de ser chamado?"
      subtitle="Só o essencial pra gente conversar sobre o seu pedido."
    >
      <Stack spacing={3}>
        <TextField
          label="Nome ou apelido"
          value={data.nickname}
          onChange={(e) => updateField('nickname', e.target.value)}
          error={touched && Boolean(errors.nickname)}
          helperText={touched && errors.nickname}
          fullWidth
          autoFocus
        />

        <TextField
          label="E-mail, Instagram ou Discord para contato"
          value={data.contact}
          onChange={(e) => updateField('contact', e.target.value)}
          error={touched && Boolean(errors.contact)}
          helperText={
            (touched && errors.contact) || 'Vamos usar isso para enviar o orçamento final.'
          }
          fullWidth
        />
      </Stack>

      <FormNavigationButtons showBack={false} onNext={handleNext} />
    </StepCard>
  );
}
