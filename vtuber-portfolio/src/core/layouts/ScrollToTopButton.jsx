import { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { tokens } from '../config/theme';

const SCROLL_THRESHOLD = 400;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Zoom in={visible}>
      <Fab
        size="medium"
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 10,
          backgroundColor: 'rgba(8,43,79,.9)',
          color: tokens.color.teal,
          border: '1px solid rgba(130,226,242,.35)',
          '&:hover': { backgroundColor: tokens.color.bgElevated2 },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
