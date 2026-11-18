import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageBackground from '../../../core/layouts/PageBackground';
import { useMakerProfile } from '../../maker/hooks/useMakerProfile';
import { tokens } from '../../../core/config/theme';

export default function TermsPage() {
  const navigate = useNavigate();
  const { profile, loading, error, reload } = useMakerProfile();
  const rawTerms = profile?.termosCondicoes?.trim() ?? '';

  return (
    <PageBackground>
      <Box sx={{ maxWidth: 760, mx: 'auto', px: { xs: 3, md: 0 }, py: { xs: 6, md: 8 } }}>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Voltar
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
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, mb: 3 }}>
            Termos e condições
          </Typography>

          {loading ? (
            <Stack alignItems="center" spacing={2} sx={{ py: 6 }}>
              <CircularProgress size={32} color="secondary" />
              <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
                Carregando termos e condições…
              </Typography>
            </Stack>
          ) : error ? (
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={reload}>
                  Tentar novamente
                </Button>
              }
            >
              {error}
            </Alert>
          ) : rawTerms ? (
            <Typography
              component="div"
              variant="body1"
              sx={{
                color: tokens.color.text,
                lineHeight: 1.75,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {rawTerms}
            </Typography>
          ) : (
            <Alert severity="info">
              Os termos e condições deste artista ainda não foram cadastrados.
            </Alert>
          )}
        </Paper>
      </Box>
    </PageBackground>
  );
}
