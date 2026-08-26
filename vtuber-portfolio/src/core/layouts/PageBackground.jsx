import Box from '@mui/material/Box';
import { media } from '../config/media';
import { tokens } from '../config/theme';

export default function PageBackground({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: tokens.color.bg,
        backgroundImage: `url(${media.backgroundPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${tokens.color.bg}D9 0%, ${tokens.color.bg}F2 55%, ${tokens.color.bg} 100%)`,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );
}
