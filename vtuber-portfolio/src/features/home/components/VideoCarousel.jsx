import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { tokens } from '../../../core/config/theme';

export default function VideoCarousel({ videos = [] }) {
  const [index, setIndex] = useState(0);
  const hasVideos = videos.length > 0;

  const goPrev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const goNext = () => setIndex((i) => (i + 1) % videos.length);

  return (
    <Box component="section" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
      <Typography variant="overline" sx={{ color: tokens.color.teal, letterSpacing: '0.25em' }}>
        Trabalhos em movimento
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, mb: 4 }}>
        Modelos em ação
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
        <IconButton
          onClick={goPrev}
          disabled={!hasVideos}
          aria-label="Vídeo anterior"
          sx={{ color: tokens.color.text }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            width: '100%',
            maxWidth: 640,
            aspectRatio: '16 / 9',
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: tokens.color.bgElevated,
            border: `1px solid ${tokens.color.purple}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasVideos ? (
            <Box
              component="video"
              key={videos[index].src}
              src={videos[index].src}
              poster={videos[index].poster}
              controls
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Stack alignItems="center" spacing={1} sx={{ color: tokens.color.textMuted, p: 3 }}>
              <MovieOutlinedIcon fontSize="large" />
              <Typography variant="body2" align="center">
                Espaço reservado para os vídeos do portfólio.
                <br />
                Adicione os arquivos em <code>src/assets/videos</code> e liste-os em{' '}
                <code>videos</code>.
              </Typography>
            </Stack>
          )}
        </Box>

        <IconButton
          onClick={goNext}
          disabled={!hasVideos}
          aria-label="Próximo vídeo"
          sx={{ color: tokens.color.text }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>

      {hasVideos && videos[index].title && (
        <Typography align="center" variant="body2" sx={{ mt: 2, color: tokens.color.textMuted }}>
          {videos[index].title}
        </Typography>
      )}
    </Box>
  );
}
