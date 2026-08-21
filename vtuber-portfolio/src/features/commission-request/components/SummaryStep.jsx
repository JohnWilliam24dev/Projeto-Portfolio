import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { usePriceSimulator } from '../hooks/usePriceSimulator';
import { getModelById } from '../../../domain/modelTypes';
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function SummaryRow({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'right', maxWidth: '60%' }}>
        {value || '—'}
      </Typography>
    </Stack>
  );
}

export default function SummaryStep({ onConfirm }) {
  const { data, goBack, isSubmitting, submitError } = useCommissionForm();
  const model = getModelById(data.modelType);
  const priceResult = usePriceSimulator(data.modelType, data.acessorios, data.expressoesExtras);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <StepCard title="Resumo do seu pedido" subtitle="Confira antes de enviar para análise.">
      <Stack spacing={1.5}>
        <SummaryRow label="Como te chamar" value={data.nickname} />
        <SummaryRow label="Contato" value={data.contact} />
        <Divider sx={{ borderColor: `${tokens.color.purple}33`, my: 1 }} />
        <SummaryRow label="Modelo" value={model?.label} />
        <SummaryRow label="Conteúdos adicionais" value={data.additionalContentNotes} />
        <SummaryRow label="Acessórios" value={`${data.acessorios}x`} />
        <SummaryRow label="Expressões extras" value={`${data.expressoesExtras}x`} />
        <SummaryRow label="Referência enviada" value={data.referenceFile?.name} />

        <Divider sx={{ borderColor: `${tokens.color.purple}33`, my: 1 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="h4" sx={{ fontSize: '1.1rem' }}>
            Preço simulado
          </Typography>
          <Typography variant="h3" sx={{ color: tokens.color.teal, fontSize: '1.7rem' }}>
            {priceResult ? formatCurrencyBRL(priceResult.total) : '—'}
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
          Valor sujeito a confirmação após a análise da referência e dos adicionais.
        </Typography>
      </Stack>

      {submitError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Não conseguimos enviar seu pedido agora ({submitError}). Tente novamente.
        </Alert>
      )}

      <FormControlLabel
        sx={{ mt: 3, alignItems: 'flex-start' }}
        control={
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            sx={{ mt: -1 }}
          />
        }
        label={
          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Eu aceito os{' '}
            <Link
              component={RouterLink}
              to="/termos"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: tokens.color.teal }}
            >
              termos e condições
            </Link>
          </Typography>
        }
      />

      <FormNavigationButtons
        onBack={goBack}
        onNext={onConfirm}
        nextLabel="Enviar pedido"
        nextDisabled={!acceptedTerms}
        loading={isSubmitting}
      />
    </StepCard>
  );
}
