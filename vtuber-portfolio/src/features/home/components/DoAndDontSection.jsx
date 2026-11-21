import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useMakerProfile } from '../../maker/hooks/useMakerProfile';
import { DO_AND_DONT_SECTION_ID } from '../../../shared/utils/domIds';
import { tokens } from '../../../core/config/theme';

function ListColumn({ title, items, icon, accentColor }) {
  if (items.length === 0) return null;

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="h3" sx={{ fontSize: '1.5rem', mb: 2, color: accentColor }}>
        {title}
      </Typography>
      <Stack spacing={1.25}>
        {items.map((item, idx) => (
          <Stack
            key={`${item}-${idx}`}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              border: `1px solid ${accentColor}40`,
              backgroundColor: `${accentColor}0F`,
            }}
          >
            <Box sx={{ color: accentColor, display: 'flex', flexShrink: 0 }}>{icon}</Box>
            <Typography variant="body2" sx={{ color: tokens.color.text }}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function DoAndDontSection() {
  const { profile, loading, error, reload } = useMakerProfile();
  const faco = profile?.faco ?? [];
  const naoFaco = profile?.naoFaco ?? [];
  const hasItems = faco.length > 0 || naoFaco.length > 0;

  if (!loading && !error && !hasItems) return null;

  return (
    <Box
      component="section"
      id={DO_AND_DONT_SECTION_ID}
      sx={{ width: 'min(1180px, 90vw)', mx: 'auto', px: 0, py: { xs: 6, md: 10 } }}
    >
      <Typography
        variant="overline"
        sx={{ color: tokens.color.accentDeep, letterSpacing: '0.25em' }}
      >
        Antes de encomendar
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, mb: 4 }}>
        O que eu faço e o que eu não faço
      </Typography>

      {loading ? (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 3 }}>
          <CircularProgress size={24} color="secondary" />
          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Carregando lista do artista…
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
      ) : (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 5, md: 6 }}
          alignItems="flex-start"
        >
          <ListColumn
            title="Eu faço"
            items={faco}
            icon={<CheckIcon fontSize="small" />}
            accentColor={tokens.color.success}
          />
          <ListColumn
            title="Eu não faço"
            items={naoFaco}
            icon={<CloseIcon fontSize="small" />}
            accentColor={tokens.color.danger}
          />
        </Stack>
      )}
    </Box>
  );
}
