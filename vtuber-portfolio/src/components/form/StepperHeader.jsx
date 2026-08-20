import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { tokens } from '../../theme/theme';

export const STEP_LABELS = [
  'Como te chamar',
  'Tipo de modelo',
  'Adicionais',
  'Referência',
  'Resumo',
];

/**
 * Mostra em que etapa o usuário está e quantas faltam.
 * Nielsen #1 — Visibilidade do status do sistema.
 */
export default function StepperHeader({ currentStep }) {
  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', px: { xs: 2, md: 0 }, pt: { xs: 4, md: 6 }, pb: 2 }}>
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{
          '& .MuiStepLabel-label': {
            color: tokens.color.textMuted,
            fontSize: { xs: '0.7rem', md: '0.85rem' },
          },
          '& .MuiStepLabel-label.Mui-active': { color: tokens.color.text },
          '& .MuiStepLabel-label.Mui-completed': { color: tokens.color.teal },
          '& .MuiStepIcon-root': { color: tokens.color.bgElevated2 },
          '& .MuiStepIcon-root.Mui-active': { color: tokens.color.purple },
          '& .MuiStepIcon-root.Mui-completed': { color: tokens.color.teal },
        }}
      >
        {STEP_LABELS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
