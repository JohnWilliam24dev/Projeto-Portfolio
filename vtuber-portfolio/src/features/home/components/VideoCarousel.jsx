import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { buildCloudinaryVideoUrl } from '../../../core/config/media';
import { tokens } from '../../../core/config/theme';

export default function VideoCarousel({ videos = [] }) {
  const [index, setIndex] = useState(0);
  const hasVideos = videos.length > 0;

  const goPrev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const goNext = () => setIndex((i) => (i + 1) % videos.length);
  const goTo = (targetIndex) => setIndex(targetIndex);

  return (
    <Box component="section" sx={{ width: 'min(1180px, 90vw)', mx: 'auto', px: 0, py: { xs: 7, md: 12 } }}>
      <Box sx={{ maxWidth: 640, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="overline" sx={{ color: tokens.color.teal, letterSpacing: '0.22em', fontWeight: 800 }}>
          Trabalhos em movimento
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '4.3rem' }, lineHeight: .95, mb: 4 }}>
          Modelos em ação
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', maxWidth: 640, mx: 'auto' }}>
        <Box
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: 'rgba(5,32,63,.68)',
            border: '1px solid rgba(130,226,242,.28)',
            boxShadow: '0 26px 65px rgba(0,0,0,.3)',
          }}
        >
          {hasVideos ? (
            <Box
              component="video"
              key={videos[index].publicId}
              src={buildCloudinaryVideoUrl(videos[index].publicId, 'f_auto,q_auto')}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                animation: 'videoCarouselFadeIn 260ms ease',
                '@keyframes videoCarouselFadeIn': {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            />
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ width: '100%', height: '100%', color: tokens.color.textMuted, p: 3 }}
            >
              <MovieOutlinedIcon fontSize="large" />
              <Typography variant="body2" align="center">
                Espaço reservado para os vídeos do portfólio.
              </Typography>
            </Stack>
          )}
        </Box>

        <IconButton
          onClick={goPrev}
          disabled={!hasVideos}
          aria-label="Vídeo anterior"
          sx={{
            position: 'absolute',
            top: '50%',
            left: -8,
            transform: 'translate(-100%, -50%)',
            color: tokens.color.text,
            display: { xs: 'none', sm: 'inline-flex' },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={goNext}
          disabled={!hasVideos}
          aria-label="Próximo vídeo"
          sx={{
            position: 'absolute',
            top: '50%',
            right: -8,
            transform: 'translate(100%, -50%)',
            color: tokens.color.text,
            display: { xs: 'none', sm: 'inline-flex' },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <IconButton
          onClick={goPrev}
          disabled={!hasVideos}
          aria-label="Vídeo anterior"
          sx={{ color: tokens.color.text, display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={goNext}
          disabled={!hasVideos}
          aria-label="Próximo vídeo"
          sx={{ color: tokens.color.text, display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>

      {hasVideos && videos.length > 1 && (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 1.5, maxWidth: 640, mx: 'auto' }}
        >
          {videos.map((video, i) => (
            <Box
              key={video.publicId}
              component="button"
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para o vídeo ${i + 1}`}
              aria-current={i === index}
              sx={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                p: 0,
                backgroundColor: i === index ? tokens.color.teal : `${tokens.color.accent}55`,
                transition: 'width 200ms ease, background-color 200ms ease',
              }}
            />
          ))}
        </Stack>
      )}

      {hasVideos && videos[index].title && (
        <Typography align="center" variant="body2" sx={{ mt: 2, color: tokens.color.textMuted }}>
          {videos[index].title}
        </Typography>
      )}
    </Box>
  );
}
