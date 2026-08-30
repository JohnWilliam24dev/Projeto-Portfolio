import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { validateModelStep, hasErrors } from '../validation/commissionRequestValidation';
import { MODEL_CATALOG } from '../../../domain/modelTypes';
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function ModelOptionCard({ model, selected, onSelect }) {
  return (
    <Box
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      sx={{
        cursor: 'pointer',
        p: 2.5,
        borderRadius: 3,
        border: `2px solid ${selected ? tokens.color.teal : tokens.color.purple + '44'}`,
        backgroundColor: selected ? `${tokens.color.teal}14` : 'transparent',
        transition: 'border-color 120ms ease, background-color 120ms ease',
        '&:hover': { borderColor: tokens.color.teal },
        '&:focus-visible': { outline: `2px solid ${tokens.color.teal}`, outlineOffset: 2 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <Typography variant="h4" sx={{ fontSize: '1.15rem' }}>
          {model.label}
        </Typography>
        <Typography variant="h4" sx={{ fontSize: '1.15rem', color: tokens.color.teal }}>
          {model.basePrice == null ? 'Preço variável' : formatCurrencyBRL(model.basePrice)}
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: tokens.color.textMuted, mt: 0.5 }}>
        {model.description}
      </Typography>
    </Box>
  );
}

export default function ModelStep() {
  const { data, updateField, goNext, goBack } = useCommissionForm();
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const validationErrors = validateModelStep(data);
    setErrors(validationErrors);
    setTouched(true);
    if (!hasErrors(validationErrors)) goNext();
  };

  return (
    <StepCard
      title="Qual tipo de modelo VTuber você deseja?"
      subtitle="O preço base varia conforme o nível de detalhe."
    >
      <Stack role="radiogroup" aria-label="Tipo de modelo" spacing={2}>
        {MODEL_CATALOG.map((model) => (
          <ModelOptionCard
            key={model.id}
            model={model}
            selected={data.modelType === model.id}
            onSelect={() => updateField('modelType', model.id)}
          />
        ))}
      </Stack>
      {touched && errors.modelType && (
        <FormHelperText error sx={{ mt: 1 }}>
          {errors.modelType}
        </FormHelperText>
      )}

      <FormNavigationButtons onBack={goBack} onNext={handleNext} />
    </StepCard>
  );
}
