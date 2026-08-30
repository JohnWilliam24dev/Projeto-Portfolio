import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { usePriceSimulator } from '../hooks/usePriceSimulator';
import { MODEL_TYPES } from '../../../domain/modelTypes';
import { ADDONS } from '../../../domain/pricing';
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function AddonNumberField({ label, value, onChange, percentLabel, disabled }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Box>
        <Typography variant="body1" sx={{ color: disabled ? tokens.color.textMuted : undefined }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
          {percentLabel} por unidade sobre o preço base
        </Typography>
      </Box>
      <TextField
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        disabled={disabled}
        inputProps={{ min: 0, style: { textAlign: 'center', width: 56 } }}
        size="small"
      />
    </Stack>
  );
}

export default function AdditionalContentStep() {
  const { data, updateField, goNext, goBack } = useCommissionForm();
  const priceResult = usePriceSimulator(data.modelType, data.acessorios, data.expressoesExtras);
  const isVariablePriceModel = data.modelType === MODEL_TYPES.OUTROS;

  useEffect(() => {
    if (isVariablePriceModel && (data.acessorios !== 0 || data.expressoesExtras !== 0)) {
      updateField('acessorios', 0);
      updateField('expressoesExtras', 0);
    }
  }, [isVariablePriceModel, data.acessorios, data.expressoesExtras, updateField]);

  return (
    <StepCard
      title="Conteúdos adicionais"
      subtitle="Sujeitos a análise. Cada item aumenta o preço base do modelo escolhido."
    >
      <Stack spacing={3}>
        <TextField
          label="Descreva os conteúdos adicionais desejados"
          value={data.additionalContentNotes}
          onChange={(e) => updateField('additionalContentNotes', e.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <Divider sx={{ borderColor: `${tokens.color.purple}33` }} />

        <AddonNumberField
          label={ADDONS.ACESSORIOS.label}
          percentLabel="+10%"
          value={data.acessorios}
          onChange={(v) => updateField('acessorios', v)}
          disabled={isVariablePriceModel}
        />
        <AddonNumberField
          label={ADDONS.EXPRESSOES_EXTRAS.label}
          percentLabel="+5%"
          value={data.expressoesExtras}
          onChange={(v) => updateField('expressoesExtras', v)}
          disabled={isVariablePriceModel}
        />

        <Box
          sx={{
            mt: 2,
            p: 2.5,
            borderRadius: 3,
            backgroundColor: `${tokens.color.teal}12`,
            border: `1px solid ${tokens.color.teal}44`,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
            Preço simulado
          </Typography>
          <Typography variant="h3" sx={{ color: tokens.color.teal, fontSize: '2rem' }}>
            {priceResult ? formatCurrencyBRL(priceResult.total) : '—'}
          </Typography>
          {isVariablePriceModel ? (
            <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
              O preço simulado é desabilitado nessa modalidade pois o preço é variável.
            </Typography>
          ) : (
            !priceResult && (
              <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
                Selecione um modelo na etapa anterior para simular o preço.
              </Typography>
            )
          )}
        </Box>
      </Stack>

      <FormNavigationButtons onBack={goBack} onNext={goNext} />
    </StepCard>
  );
}
