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
    <Box component="section" id="processo" sx={{ width: 'min(1180px, 90vw)', mx: 'auto', px: 0, py: { xs: 7, md: 12 } }}>
      <Typography variant="overline" sx={{ color: tokens.color.teal, letterSpacing: '0.22em', fontWeight: 800 }}>
        Do rascunho ao modelo
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '4.3rem' }, lineHeight: .95, mb: 5 }}>
        Como a ideia ganha vida
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {PROCESS_STEPS.map((step) => (
          <Box
            key={step.number}
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 4,
              backgroundColor: 'rgba(6,39,72,.57)',
              border: '1px solid rgba(129,228,241,.17)',
              boxShadow: '0 18px 45px rgba(0,0,0,.2)',
              transition: 'transform .25s ease, border-color .25s ease',
              '&:hover': { transform: 'translateY(-6px)', borderColor: 'rgba(129,228,241,.4)' },
            }}
          >
            <Typography variant="overline" sx={{ color: tokens.color.teal, fontWeight: 800 }}>
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
