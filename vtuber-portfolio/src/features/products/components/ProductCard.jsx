import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { buildCloudinaryUrl } from '../../../core/config/media';
import { tokens } from '../../../core/config/theme';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const thumbnailUrl = buildCloudinaryUrl(
    product.imagePublicIds[0],
    'f_auto,q_auto,w_500,h_500,c_fill'
  );

  const goToDetail = () => navigate(`/produtos/${product.id}`);

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goToDetail()}
      sx={{
        cursor: 'pointer',
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${tokens.color.accent}33`,
        backgroundColor: `${tokens.color.bgElevated}CC`,
        transition: 'border-color 120ms ease, transform 120ms ease',
        '&:hover': { borderColor: tokens.color.teal, transform: 'translateY(-2px)' },
        '&:focus-visible': { outline: `2px solid ${tokens.color.teal}`, outlineOffset: 2 },
      }}
    >
      <Box
        component="img"
        src={thumbnailUrl}
        alt={product.name}
        loading="lazy"
        sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
      />
      <Typography variant="h4" sx={{ fontSize: '1.05rem', p: 2, textAlign: 'center' }}>
        {product.name}
      </Typography>
    </Box>
  );
}
