import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../config/theme';

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function interpolateColor(fromHex, toHex, ratio) {
  const [fr, fg, fb] = hexToRgb(fromHex);
  const [tr, tg, tb] = hexToRgb(toHex);
  const r = Math.round(fr + (tr - fr) * ratio);
  const g = Math.round(fg + (tg - fg) * ratio);
  const b = Math.round(fb + (tb - fb) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

const BUBBLES = [
  { top: '6%', left: '10%', size: 220, color: tokens.color.blue, duration: 10, delay: 0 },
  { top: '18%', left: '80%', size: 150, color: tokens.color.teal, duration: 12, delay: 1.4 },
  { top: '38%', left: '4%', size: 130, color: tokens.color.accent, duration: 9, delay: 0.6 },
  { top: '55%', left: '88%', size: 260, color: tokens.color.teal, duration: 13, delay: 2.2 },
  { top: '72%', left: '18%', size: 180, color: tokens.color.blue, duration: 11, delay: 0.9 },
  { top: '88%', left: '68%', size: 210, color: tokens.color.accent, duration: 14, delay: 1.8 },
];

export default function PageBackground({ children }) {
  const [depthRatio, setDepthRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setDepthRatio(Math.min(1, Math.max(0, ratio)));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const depthColor = interpolateColor(tokens.color.bg, tokens.color.abyss, depthRatio);
  const bubblesOpacity = 1 - depthRatio * 0.7;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          backgroundColor: depthColor,
          transition: 'background-color 160ms linear',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
          opacity: bubblesOpacity,
          transition: 'opacity 160ms linear',
        }}
      >
        {BUBBLES.map((bubble) => (
          <Box
            key={`${bubble.top}-${bubble.left}`}
            sx={{
              position: 'absolute',
              top: bubble.top,
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 30%, ${bubble.color}4D, ${bubble.color}00 70%)`,
              filter: 'blur(1px)',
              animation: `pageBackgroundFloat ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
              '@keyframes pageBackgroundFloat': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-24px)' },
              },
            }}
          />
        ))}
      </Box>
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  );
}
