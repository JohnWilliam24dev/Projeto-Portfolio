import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import { tokens } from '../config/theme';

const NAV_LINKS = [
  { label: 'Início', targetId: null },
  { label: 'Modelos', targetId: 'produtos' },
  { label: 'Processo', targetId: 'processo' },
];

export default function Header() {
  const navigate = useNavigate();

  const scrollToId = (targetId) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'blur(18px)',
        backgroundColor: 'rgba(4,20,43,.62)',
        borderBottom: '1px solid rgba(151,239,250,.11)',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: 'min(1280px, 100%)', mx: 'auto', px: { xs: 3, md: 7 }, py: 1.3 }}
      >
        <Box component="img" src={logo} alt="LeviBluuVtuber" sx={{ height: 44, display: 'block' }} />

        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.label}
              variant="text"
              onClick={() => scrollToId(link.targetId)}
              sx={{ color: '#c5e0ef', fontWeight: 700, '&:hover': { color: '#fff' } }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>

        <Button variant="outlined" onClick={() => navigate('/comissao')} sx={{ color: tokens.color.text, borderColor: 'rgba(130,226,242,.32)', backgroundColor: 'rgba(55,198,220,.08)', '&:hover': { borderColor: tokens.color.teal, backgroundColor: 'rgba(55,198,220,.16)' } }}>
          Vamos criar
        </Button>
      </Stack>
    </Box>
  );
}
