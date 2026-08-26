import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { media } from '../../../core/config/media';
import { profileContent } from '../../../shared/utils/profileContent';
import { tokens } from '../../../core/config/theme';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Stack
      component="section"
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      spacing={{ xs: 4, md: 8 }}
      sx={{ minHeight: { xs: 'auto', md: '92vh' }, px: { xs: 3, md: 8 }, py: { xs: 10, md: 4 } }}
    >
      <Avatar
        src={media.profilePhoto}
        alt={`Foto de perfil de ${profileContent.name}`}
        sx={{
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          border: `2px solid ${tokens.color.teal}66`,
          boxShadow: `0 0 60px ${tokens.color.purple}55`,
          flexShrink: 0,
        }}
      />

      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 560 }}>
        <Typography
          variant="overline"
          sx={{ color: tokens.color.teal, letterSpacing: '0.25em' }}
        >
          {profileContent.tagline}
        </Typography>

        <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '3.6rem' }, mt: 1 }}>
          {profileContent.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: tokens.color.textMuted, mt: 2, fontSize: '1.05rem', lineHeight: 1.7 }}
        >
          {profileContent.bio}
        </Typography>

        <Button
          size="large"
          variant="contained"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/comissao')}
          sx={{ mt: 4 }}
        >
          Encomendar meu VTuber
        </Button>

        <Button
          variant="text"
          color="inherit"
          onClick={() => navigate('/termos')}
          sx={{ mt: 1, display: 'block', color: tokens.color.textMuted }}
        >
          Termos e condições
        </Button>
      </Box>
    </Stack>
  );
}
