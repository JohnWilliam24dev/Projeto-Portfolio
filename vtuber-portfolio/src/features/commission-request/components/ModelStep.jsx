import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { validateModelStep, hasErrors } from '../validation/commissionRequestValidation';
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function ModelOptionCard({ model, selected, onSelect, showPrice }) {
  const addonsCount = model.adicionais?.length ?? 0;

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
        border: `2px solid ${selected ? tokens.color.teal : tokens.color.accent + '44'}`,
        backgroundColor: selected ? `${tokens.color.teal}14` : 'transparent',
        transition: 'border-color 120ms ease, background-color 120ms ease',
        '&:hover': { borderColor: tokens.color.teal },
        '&:focus-visible': { outline: `2px solid ${tokens.color.teal}`, outlineOffset: 2 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2}>
        <Typography variant="h4" sx={{ fontSize: '1.15rem' }}>
          {model.nome}
        </Typography>
        {showPrice && model.precoBase !== undefined && (
          <Typography variant="h4" sx={{ fontSize: '1.15rem', color: tokens.color.accentDeep }}>
            {formatCurrencyBRL(model.precoBase)}
          </Typography>
        )}
      </Stack>
      {addonsCount > 0 && (
        <Typography variant="body2" sx={{ color: tokens.color.textMuted, mt: 0.5 }}>
          {addonsCount === 1
            ? '1 adicional disponível para este modelo.'
            : `${addonsCount} adicionais disponíveis para este modelo.`}
        </Typography>
      )}
    </Box>
  );
}

export default function ModelStep({ catalog }) {
  const { data, updateField, resetAddons, goNext, goBack } = useCommissionForm();
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const tipos = catalog?.tipos ?? [];
  const showPrices = Boolean(catalog?.config?.exibirValores);

  const handleSelectModel = (tipoId) => {
    if (data.tipoProdutoId !== tipoId) {
      updateField('tipoProdutoId', tipoId);
      resetAddons();
    }
  };

  const handleNext = () => {
    const validationErrors = validateModelStep(data, catalog);
    setErrors(validationErrors);
    setTouched(true);
    if (!hasErrors(validationErrors)) goNext();
  };

  return (
    <StepCard
      title="Qual tipo de modelo VTuber você deseja?"
      subtitle={
        showPrices
          ? 'O preço base varia conforme o tipo escolhido.'
          : 'Escolha a categoria do pedido para continuar.'
      }
    >
      {tipos.length === 0 ? (
        <Alert severity="info">
          Nenhum tipo de produto disponível no catálogo no momento.
        </Alert>
      ) : (
        <Stack role="radiogroup" aria-label="Tipo de modelo" spacing={2}>
          {tipos.map((model) => (
            <ModelOptionCard
              key={model.id}
              model={model}
              selected={data.tipoProdutoId === model.id}
              onSelect={() => handleSelectModel(model.id)}
              showPrice={showPrices}
            />
          ))}
        </Stack>
      )}

      {touched && errors.tipoProdutoId && (
        <FormHelperText error sx={{ mt: 1 }}>
          {errors.tipoProdutoId}
        </FormHelperText>
      )}

      <FormNavigationButtons onBack={goBack} onNext={handleNext} nextDisabled={tipos.length === 0} />
    </StepCard>
  );
}
