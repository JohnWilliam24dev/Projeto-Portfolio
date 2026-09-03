import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { media } from '../../../core/config/media';
import { profileContent } from '../../../shared/utils/profileContent';
import { DO_AND_DONT_SECTION_ID } from '../../../shared/utils/domIds';
import { tokens } from '../../../core/config/theme';

export default function HeroSection() {
  const navigate = useNavigate();

  const scrollToDoAndDont = () => {
    document.getElementById(DO_AND_DONT_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Stack
      component="section"
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      spacing={{ xs: 5, md: 5 }}
      sx={{ width: 'min(1180px, 90vw)', mx: 'auto', minHeight: { xs: 'auto', md: 'calc(100vh - 82px)' }, px: 0, py: { xs: 8, md: 9 } }}
    >
      <Avatar
        src={media.profilePhoto}
        alt={`Foto de perfil de ${profileContent.name}`}
        sx={{
          order: { xs: 0, md: 2 },
          width: { xs: 250, md: 430 },
          height: { xs: 250, md: 540 },
          borderRadius: { xs: '42% 42% 30px 30px', md: '45% 45% 35px 35px' },
          border: '1px solid rgba(153,241,255,.5)',
          boxShadow: '0 30px 100px rgba(0,0,0,.45), 0 0 45px rgba(81,223,239,.18)',
          backgroundColor: 'rgba(3,31,62,.45)',
          flexShrink: 0,
          position: 'relative',
          '&::before': { content: '""', position: 'absolute', inset: -34, zIndex: -1, borderRadius: '50%', background: 'radial-gradient(circle, rgba(70,226,240,.24), rgba(43,119,255,.1) 42%, transparent 68%)' },
        }}
      />

      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 640, order: 1 }}>
        <Typography
          variant="overline"
          sx={{ color: tokens.color.teal, letterSpacing: '0.22em', fontWeight: 800 }}
        >
          {profileContent.tagline}
        </Typography>

        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '4.2rem', md: 'clamp(5.4rem, 9vw, 7.75rem)' }, lineHeight: .84, letterSpacing: '-.05em', mt: 1.5, color: tokens.color.text }}
        >
          {profileContent.name}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontFamily: tokens.font.display,
            fontSize: { xs: '1.65rem', md: '2.55rem' },
            color: tokens.color.text,
            mt: 2,
          }}
        >
          {profileContent.bio.headline}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: tokens.color.coral,
            fontWeight: 600,
            fontSize: '1.12rem',
            mt: 1,
            lineHeight: 1.5,
          }}
        >
          {profileContent.bio.subheadline}
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          gap={1}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{ mt: 2.5 }}
        >
          {profileContent.bio.specialties.map((specialty) => (
            <Box
              key={specialty}
              sx={{
                flexShrink: 0,
                whiteSpace: 'nowrap',
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                border: '1px solid rgba(99,226,242,.3)',
                backgroundColor: 'rgba(32,176,202,.06)',
              }}
            >
              <Typography variant="caption" sx={{ color: '#bcebf2' }}>
                {specialty}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: tokens.color.textMuted, mt: 2.5, fontSize: '1rem', lineHeight: 1.7 }}
        >
          {profileContent.bio.pitch}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: '#c9e7f1', fontWeight: 600, fontSize: '1.16rem', mt: 2.5 }}
        >
          {profileContent.bio.callToAction}
        </Typography>

        <Button
          size="large"
          variant="contained"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/comissao')}
          sx={{ mt: 3 }}
        >
          Encomendar meu VTuber
        </Button>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{ mt: 1 }}
        >
          <Button
            variant="text"
            color="inherit"
            onClick={() => navigate('/termos')}
            sx={{ color: tokens.color.textMuted }}
          >
            Termos e condições
          </Button>

          <Button
            variant="text"
            color="inherit"
            onClick={scrollToDoAndDont}
            sx={{ color: tokens.color.textMuted }}
          >
            Faço e não faço
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
