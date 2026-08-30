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
      spacing={{ xs: 4, md: 8 }}
      sx={{ minHeight: { xs: 'auto', md: '70vh' }, px: { xs: 3, md: 8 }, py: { xs: 10, md: 8 } }}
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
          variant="h3"
          sx={{
            fontSize: { xs: '1.3rem', md: '1.6rem' },
            color: tokens.color.text,
            mt: 2,
          }}
        >
          {profileContent.bio.headline}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: tokens.color.teal,
            fontWeight: 600,
            fontSize: '1.05rem',
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
                border: `1px solid ${tokens.color.teal}55`,
                backgroundColor: `${tokens.color.teal}12`,
              }}
            >
              <Typography variant="caption" sx={{ color: tokens.color.teal }}>
                {specialty}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: tokens.color.textMuted, mt: 2, fontSize: '0.95rem', lineHeight: 1.6 }}
        >
          {profileContent.bio.pitch}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: tokens.color.text, fontWeight: 600, mt: 2.5 }}
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
