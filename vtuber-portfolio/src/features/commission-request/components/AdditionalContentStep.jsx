import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import StepCard from './StepCard';
import FormNavigationButtons from './FormNavigationButtons';
import { useCommissionForm } from '../hooks/useCommissionForm';
import { usePriceSimulator } from '../hooks/usePriceSimulator';
import { validateAdditionalContentStep, hasErrors } from '../validation/commissionRequestValidation';
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function formatAddonPriceHint(addon, showPrices) {
  if (!showPrices) return null;
  if (addon.valorUnitario !== undefined) {
    const base = `${formatCurrencyBRL(addon.valorUnitario)} por unidade`;
    if (addon.porcentagem) {
      return `${base} (${Number(addon.porcentagem)}% do valor base)`;
    }
    return base;
  }
  return null;
}

function AddonRow({ addon, selection, onChange, showPrices, errorMessage }) {
  const quantity = selection?.quantity ?? 0;
  const descricaoCliente = selection?.descricaoCliente ?? '';
  const priceHint = formatAddonPriceHint(addon, showPrices);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${quantity > 0 ? tokens.color.teal + '88' : tokens.color.accent + '33'}`,
        backgroundColor: quantity > 0 ? `${tokens.color.teal}0D` : 'transparent',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {addon.nome}
          </Typography>
          {addon.descricao && (
            <Typography variant="caption" sx={{ color: tokens.color.textMuted, display: 'block' }}>
              {addon.descricao}
            </Typography>
          )}
          {priceHint && (
            <Typography variant="caption" sx={{ color: tokens.color.teal, display: 'block', mt: 0.25 }}>
              {priceHint}
            </Typography>
          )}
        </Box>
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => {
            const raw = Math.floor(Number(e.target.value) || 0);
            const clamped = Math.min(20, Math.max(0, raw));
            onChange({ quantity: clamped });
          }}
          inputProps={{ min: 0, max: 20, style: { textAlign: 'center', width: 56 } }}
          size="small"
        />
      </Stack>

      {quantity > 0 && (
        <TextField
          label={`Descreva o que deseja em "${addon.nome}"`}
          value={descricaoCliente}
          onChange={(e) => onChange({ descricaoCliente: e.target.value })}
          error={Boolean(errorMessage)}
          helperText={errorMessage || 'Obrigatório quando o adicional é selecionado.'}
          inputProps={{ maxLength: 500 }}
          size="small"
          fullWidth
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
}

export default function AdditionalContentStep({ catalog }) {
  const { data, updateField, updateAddon, goNext, goBack } = useCommissionForm();
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const isCatalogMode = catalog?.config?.modalidade === 'CATALOGO';
  const showPrices = Boolean(catalog?.config?.exibirValores);
  const selectedType = isCatalogMode
    ? catalog?.tipos?.find((t) => t.id === data.tipoProdutoId) ?? null
    : null;
  const availableAddons = selectedType?.adicionais ?? [];

  const priceResult = usePriceSimulator(selectedType, data.adicionais, showPrices);

  const handleNext = () => {
    const validationErrors = validateAdditionalContentStep(data, selectedType);
    setErrors(validationErrors);
    setTouched(true);
    if (!hasErrors(validationErrors)) goNext();
  };

  return (
    <StepCard
      title={isCatalogMode ? 'Descrição e adicionais' : 'Descreva o seu pedido'}
      subtitle={
        isCatalogMode
          ? 'Conte sobre o personagem e escolha os adicionais desejados.'
          : 'Este artista trabalha com orçamento personalizado após análise.'
      }
    >
      <Stack spacing={3}>
        <TextField
          label="Descrição do pedido"
          placeholder="Conte os detalhes do personagem, estilo, poses, prazos ou qualquer informação importante."
          value={data.descricao}
          onChange={(e) => updateField('descricao', e.target.value)}
          error={touched && Boolean(errors.descricao)}
          helperText={
            (touched && errors.descricao) ||
            `${(data.descricao ?? '').length}/1000 caracteres`
          }
          inputProps={{ maxLength: 1000 }}
          multiline
          minRows={4}
          fullWidth
        />

        {isCatalogMode && availableAddons.length > 0 && (
          <>
            <Divider sx={{ borderColor: `${tokens.color.accent}33` }} />
            <Stack spacing={2}>
              <Typography variant="subtitle2" sx={{ color: tokens.color.text }}>
                Adicionais disponíveis
              </Typography>
              {availableAddons.map((addon) => (
                <AddonRow
                  key={addon.id}
                  addon={addon}
                  selection={data.adicionais[addon.id]}
                  onChange={(patch) => updateAddon(addon.id, patch)}
                  showPrices={showPrices}
                  errorMessage={touched ? errors.addonErrors?.[addon.id] : undefined}
                />
              ))}
            </Stack>
            {touched && errors.adicionais && (
              <FormHelperText error>{errors.adicionais}</FormHelperText>
            )}
          </>
        )}

        {isCatalogMode && showPrices && (
          <Box
            sx={{
              mt: 1,
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
            <Typography variant="h3" sx={{ color: tokens.color.accentDeep, fontSize: '2rem' }}>
              {priceResult ? formatCurrencyBRL(priceResult.total) : '—'}
            </Typography>
          </Box>
        )}
      </Stack>

      <FormNavigationButtons onBack={goBack} onNext={handleNext} />
    </StepCard>
  );
}
