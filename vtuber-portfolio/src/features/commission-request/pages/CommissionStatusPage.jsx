import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import PageBackground from '../../../core/layouts/PageBackground';
import { fetchCommissionByToken } from '../services/submitCommissionRequest';
import { formatCurrencyBRL } from '../../../domain/pricing';
import { tokens } from '../../../core/config/theme';

function formatDateBR(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function StatusRow({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function CommissionStatusPage() {
  const { token: urlToken } = useParams();
  const navigate = useNavigate();

  const [inputToken, setInputToken] = useState((urlToken ?? '').toUpperCase());
  const [commission, setCommission] = useState(null);
  const [loading, setLoading] = useState(Boolean(urlToken));
  const [error, setError] = useState(null);

  const loadToken = useCallback(async (targetToken) => {
    const clean = (targetToken ?? '').trim().toUpperCase();
    if (!clean) return;

    setLoading(true);
    setError(null);
    setCommission(null);
    try {
      const result = await fetchCommissionByToken(clean);
      setCommission(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível consultar o pedido.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (urlToken) {
      setInputToken(urlToken.toUpperCase());
      loadToken(urlToken);
    } else {
      setLoading(false);
      setCommission(null);
      setError(null);
    }
  }, [urlToken, loadToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = inputToken.trim().toUpperCase();
    if (!clean) return;
    if (clean === (urlToken ?? '').toUpperCase()) {
      loadToken(clean);
    } else {
      navigate(`/pedido/${encodeURIComponent(clean)}`);
    }
  };

  return (
    <PageBackground>
      <Box sx={{ maxWidth: 640, mx: 'auto', px: { xs: 3, md: 0 }, py: { xs: 6, md: 8 } }}>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3, color: tokens.color.textMuted }}
        >
          Voltar para a home
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(135deg, rgba(7,58,99,.78), rgba(8,32,65,.88))',
            border: '1px solid rgba(130,230,242,.27)',
            borderRadius: 5,
            boxShadow: '0 28px 80px rgba(0,8,30,.35)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1.7rem', md: '2.1rem' }, mb: 1 }}>
            Acompanhar pedido
          </Typography>
          <Typography variant="body2" sx={{ color: tokens.color.textMuted, mb: 3 }}>
            Informe o código de 5 caracteres recebido após o envio do seu pedido.
          </Typography>

          <Stack component="form" direction={{ xs: 'column', sm: 'row' }} spacing={1.5} onSubmit={handleSubmit}>
            <TextField
              label="Código do pedido"
              placeholder="Ex.: A3K9P"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value.toUpperCase())}
              inputProps={{ maxLength: 10 }}
              size="small"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<SearchIcon />}
              disabled={!inputToken.trim() || loading}
              sx={{ flexShrink: 0 }}
            >
              Consultar
            </Button>
          </Stack>

          {loading && (
            <Stack alignItems="center" spacing={1.5} sx={{ py: 5 }}>
              <CircularProgress size={28} color="secondary" />
              <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
                Buscando pedido…
              </Typography>
            </Stack>
          )}

          {error && !loading && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {commission && !loading && (
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                border: `1px solid ${tokens.color.teal}44`,
                backgroundColor: 'rgba(5,32,63,.6)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="overline" sx={{ color: tokens.color.textMuted }}>
                  Status atual
                </Typography>
                <Chip
                  label={commission.status}
                  sx={{
                    color: tokens.color.teal,
                    borderColor: `${tokens.color.teal}66`,
                    backgroundColor: `${tokens.color.teal}18`,
                    fontWeight: 700,
                  }}
                  variant="outlined"
                />
              </Stack>

              <Divider sx={{ borderColor: `${tokens.color.accent}22`, my: 2 }} />

              <Stack spacing={1.5}>
                <StatusRow
                  label="Tipo de modelo"
                  value={commission.tipoProduto ?? 'Sob orçamento'}
                />
                <StatusRow
                  label="Criado em"
                  value={formatDateBR(commission.criadoEm)}
                />
                {commission.precoSimulado !== null && (
                  <StatusRow
                    label="Preço simulado"
                    value={formatCurrencyBRL(commission.precoSimulado)}
                  />
                )}
                <StatusRow
                  label="Orçamento final"
                  value={
                    commission.orcamentoFechado && commission.orcamentoFinal !== null
                      ? formatCurrencyBRL(commission.orcamentoFinal)
                      : 'A orçar'
                  }
                />
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </PageBackground>
  );
}
