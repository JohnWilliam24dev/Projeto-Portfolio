import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { tokens } from '../../../core/config/theme';

export default function StepCard({ title, subtitle, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 640,
        mx: 'auto',
        p: { xs: 3, md: 5 },
        background: 'linear-gradient(135deg, rgba(7,58,99,.78), rgba(8,32,65,.88))',
        border: '1px solid rgba(130,230,242,.27)',
        borderRadius: { xs: 3, md: 5 },
        boxShadow: '0 28px 80px rgba(0,8,30,.35)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '1.9rem' } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: tokens.color.textMuted, mt: 1 }}>
          {subtitle}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Paper>
  );
}
