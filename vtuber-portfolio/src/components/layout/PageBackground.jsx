import Box from '@mui/material/Box';
import backgroundImage from '../../assets/images/background.png';
import { tokens } from '../../theme/theme';

/**
 * Aplica a imagem de fundo em toda a página com um overlay escuro
 * gradiente, garantindo contraste de texto suficiente por cima
 * (acessibilidade / legibilidade — Nielsen: estética e design minimalista
 * não deve custar legibilidade).
 */
export default function PageBackground({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: tokens.color.bg,
        backgroundImage: `url(${backgroundImage})`,
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
