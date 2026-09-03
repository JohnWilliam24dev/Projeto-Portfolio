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
        backdropFilter: 'blur(10px)',
        backgroundColor: `${tokens.color.bg}CC`,
        borderBottom: `1px solid ${tokens.color.accent}22`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: { xs: 3, md: 8 }, py: 1.5 }}
      >
        <Box component="img" src={logo} alt="LeviBluuVtuber" sx={{ height: 44, display: 'block' }} />

        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.label}
              variant="text"
              onClick={() => scrollToId(link.targetId)}
              sx={{ color: tokens.color.text, fontWeight: 600 }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>

        <Button variant="contained" color="secondary" onClick={() => navigate('/comissao')}>
          Vamos criar
        </Button>
      </Stack>
    </Box>
  );
}
