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
  const goTo = (targetIndex) => setIndex(targetIndex);

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
            boxShadow: `0 12px 40px ${tokens.color.purpleDeep}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasVideos ? (
            <Box
              component="iframe"
              key={videos[index].youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${videos[index].youtubeId}?rel=0&modestbranding=1`}
              title={videos[index].title ?? 'Vídeo do portfólio'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{
                width: '100%',
                height: '100%',
                border: 0,
                animation: 'videoCarouselFadeIn 320ms ease',
                '@keyframes videoCarouselFadeIn': {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            />
          ) : (
            <Stack alignItems="center" spacing={1} sx={{ color: tokens.color.textMuted, p: 3 }}>
              <MovieOutlinedIcon fontSize="large" />
              <Typography variant="body2" align="center">
                Espaço reservado para os vídeos do portfólio.
                <br />
                Suba o vídeo como "não listado" no YouTube e adicione o ID em{' '}
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

      {hasVideos && videos.length > 1 && (
        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2.5 }}>
          {videos.map((video, i) => (
            <Box
              key={video.youtubeId}
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
                backgroundColor: i === index ? tokens.color.teal : `${tokens.color.purple}55`,
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
