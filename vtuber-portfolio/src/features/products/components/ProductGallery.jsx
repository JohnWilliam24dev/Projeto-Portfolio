import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { tokens } from '../../../core/config/theme';

export default function ProductGallery({ images = [], productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const validImages = images.filter(Boolean);
  const heroUrl = validImages[selectedIndex] ?? validImages[0];

  if (!heroUrl) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(130,226,242,.28)',
          backgroundColor: 'rgba(5,32,63,.68)',
        }}
      >
        <Box
          component="img"
          src={heroUrl}
          alt={`${productName} - imagem ${selectedIndex + 1}`}
          sx={{ width: '100%', display: 'block' }}
        />
      </Box>

      {validImages.length > 1 && (
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          {validImages.map((imageUrl, index) => (
            <Box
              key={`${imageUrl}-${index}`}
              component="img"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedIndex(index)}
              src={imageUrl}
              alt={`${productName} - variação ${index + 1}`}
              sx={{
                width: 72,
                height: 72,
                borderRadius: 2,
                objectFit: 'cover',
                cursor: 'pointer',
                border: `2px solid ${index === selectedIndex ? tokens.color.teal : 'transparent'}`,
                opacity: index === selectedIndex ? 1 : 0.7,
                transition: 'opacity 120ms ease, border-color 120ms ease',
              }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
