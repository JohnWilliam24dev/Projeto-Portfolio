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
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function SummaryRow({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'right', maxWidth: '60%', whiteSpace: 'pre-wrap' }}>
        {value || '—'}
      </Typography>
    </Stack>
  );
}

export default function SummaryStep({ catalog, onConfirm }) {
  const { data, goBack, isSubmitting, submitError } = useCommissionForm();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isCatalogMode = catalog?.config?.modalidade === 'CATALOGO';
  const showPrices = Boolean(catalog?.config?.exibirValores);
  const selectedType = isCatalogMode
    ? catalog?.tipos?.find((t) => t.id === data.tipoProdutoId) ?? null
    : null;
  const priceResult = usePriceSimulator(selectedType, data.adicionais, showPrices);

  const selectedAddons = (selectedType?.adicionais ?? [])
    .map((addon) => {
      const sel = data.adicionais[addon.id];
      if (!sel || Number(sel.quantity) <= 0) return null;
      return {
        id: addon.id,
        nome: addon.nome,
        quantity: Number(sel.quantity),
        descricaoCliente: sel.descricaoCliente,
      };
    })
    .filter(Boolean);

  return (
    <StepCard title="Resumo do seu pedido" subtitle="Confira antes de enviar para análise.">
      <Stack spacing={1.5}>
        <SummaryRow label="Como te chamar" value={data.nomeCliente} />
        <SummaryRow label="Contato" value={data.contato} />
        {data.email?.trim() && <SummaryRow label="E-mail" value={data.email.trim()} />}

        <Divider sx={{ borderColor: `${tokens.color.accent}33`, my: 1 }} />

        {isCatalogMode && <SummaryRow label="Modelo" value={selectedType?.nome} />}
        <SummaryRow label="Descrição" value={data.descricao} />

        {selectedAddons.map((addon) => (
          <SummaryRow
            key={addon.id}
            label={`${addon.nome} (${addon.quantity}x)`}
            value={addon.descricaoCliente}
          />
        ))}

        <SummaryRow label="Referência enviada" value={data.referenceFile?.name} />

        {isCatalogMode && showPrices && (
          <>
            <Divider sx={{ borderColor: `${tokens.color.accent}33`, my: 1 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography variant="h4" sx={{ fontSize: '1.1rem' }}>
                Preço simulado
              </Typography>
              <Typography variant="h3" sx={{ color: tokens.color.accentDeep, fontSize: '1.7rem' }}>
                {priceResult ? formatCurrencyBRL(priceResult.total) : '—'}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
              Valor sujeito a confirmação após a análise da referência e dos adicionais.
            </Typography>
          </>
        )}

        {(!isCatalogMode || !showPrices) && (
          <>
            <Divider sx={{ borderColor: `${tokens.color.accent}33`, my: 1 }} />
            <Typography variant="caption" sx={{ color: tokens.color.textMuted }}>
              O orçamento final será definido pelo artista após a análise do pedido.
            </Typography>
          </>
        )}
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
              sx={{ color: tokens.color.accentDeep }}
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
