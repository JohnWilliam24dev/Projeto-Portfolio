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
        backgroundColor: `${tokens.color.bgElevated}CC`,
        border: `1px solid ${tokens.color.purple}33`,
        backdropFilter: 'blur(6px)',
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
