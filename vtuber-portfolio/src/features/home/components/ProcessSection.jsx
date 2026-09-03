import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { tokens } from '../../../core/config/theme';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Você conta a ideia',
    description:
      'Referências, personalidade, universo — aquilo que hoje só existe na sua cabeça.',
  },
  {
    number: '02',
    title: 'Eu esboço o conceito',
    description: 'Silhueta, paleta e direção de arte antes de qualquer modelagem começar.',
  },
  {
    number: '03',
    title: 'Modelo o personagem',
    description: 'Modelagem 3D, texturização e ajustes até ganhar presença de verdade.',
  },
  {
    number: '04',
    title: 'Você recebe pronto',
    description: 'Um VTuber com identidade própria, pronto pra ocupar a tela.',
  },
];

export default function ProcessSection() {
  return (
    <Box component="section" id="processo" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
      <Typography variant="overline" sx={{ color: tokens.color.accentDeep, letterSpacing: '0.25em' }}>
        Do rascunho ao modelo
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, mb: 4 }}>
        Como a ideia ganha vida
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {PROCESS_STEPS.map((step) => (
          <Box
            key={step.number}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 3,
              backgroundColor: tokens.color.bgElevated,
              border: `1px solid ${tokens.color.accent}22`,
              boxShadow: '0 12px 30px rgba(15, 61, 145, 0.08)',
            }}
          >
            <Typography variant="overline" sx={{ color: tokens.color.accent, fontWeight: 700 }}>
              {step.number}
            </Typography>
            <Typography variant="h4" sx={{ fontSize: '1.15rem', mt: 1, mb: 1 }}>
              {step.title}
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.color.textMuted, lineHeight: 1.6 }}>
              {step.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
