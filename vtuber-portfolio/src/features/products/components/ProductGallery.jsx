import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { buildCloudinaryUrl } from '../../../core/config/media';
import { tokens } from '../../../core/config/theme';

export default function ProductGallery({ imagePublicIds, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const heroUrl = buildCloudinaryUrl(imagePublicIds[selectedIndex], 'f_auto,q_auto,w_900');

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          border: `1px solid ${tokens.color.accent}33`,
          backgroundColor: tokens.color.bgElevated,
        }}
      >
        <Box
          component="img"
          src={heroUrl}
          alt={`${productName} - imagem ${selectedIndex + 1}`}
          sx={{ width: '100%', display: 'block' }}
        />
      </Box>

      {imagePublicIds.length > 1 && (
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          {imagePublicIds.map((publicId, index) => (
            <Box
              key={publicId}
              component="img"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedIndex(index)}
              src={buildCloudinaryUrl(publicId, 'f_auto,q_auto,w_150,h_150,c_fill')}
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
