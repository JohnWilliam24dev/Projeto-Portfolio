import { useState } from 'react';
import Box from '@mui/material/Box';
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
          value={data.nomeCliente}
          onChange={(e) => updateField('nomeCliente', e.target.value)}
          error={touched && Boolean(errors.nomeCliente)}
          helperText={touched && errors.nomeCliente}
          inputProps={{ maxLength: 80 }}
          fullWidth
          autoFocus
        />

        <TextField
          label="Instagram, Discord ou outro contato"
          value={data.contato}
          onChange={(e) => updateField('contato', e.target.value)}
          error={touched && Boolean(errors.contato)}
          helperText={
            (touched && errors.contato) || 'Vamos usar isso para conversar e enviar o orçamento final.'
          }
          inputProps={{ maxLength: 160 }}
          fullWidth
        />

        <TextField
          label="E-mail (opcional)"
          type="email"
          value={data.email}
          onChange={(e) => updateField('email', e.target.value)}
          error={touched && Boolean(errors.email)}
          helperText={touched && errors.email}
          inputProps={{ maxLength: 254 }}
          fullWidth
        />

        {/* Honeypot anti-bot: mantido oculto para usuários reais */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: '-9999px',
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          <TextField
            label="Website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
          />
        </Box>
      </Stack>

      <FormNavigationButtons showBack={false} onNext={handleNext} />
    </StepCard>
  );
}
