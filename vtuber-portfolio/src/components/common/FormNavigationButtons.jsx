import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function FormNavigationButtons({
  onBack,
  onNext,
  backLabel = 'Voltar',
  nextLabel = 'Continuar',
  nextDisabled = false,
  showBack = true,
  loading = false,
}) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mt: 5 }}>
      {showBack ? (
        <Button variant="text" color="inherit" startIcon={<ArrowBackIcon />} onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <span />
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={onNext}
        disabled={nextDisabled || loading}
        endIcon={!loading ? <ArrowForwardIcon /> : undefined}
      >
        {loading ? 'Enviando…' : nextLabel}
      </Button>
    </Stack>
  );
}
