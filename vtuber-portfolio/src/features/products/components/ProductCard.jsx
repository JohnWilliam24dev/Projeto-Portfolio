import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../../core/config/theme';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`/produtos/${product.id}`, { state: { product } });

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goToDetail()}
      sx={{
        cursor: 'pointer',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid rgba(130,226,242,.24)',
        backgroundColor: 'rgba(5,32,63,.68)',
        boxShadow: '0 18px 45px rgba(0,0,0,.2)',
        transition: 'border-color .25s ease, transform .25s ease',
        '&:hover': { borderColor: tokens.color.teal, transform: 'translateY(-6px)' },
        '&:focus-visible': { outline: `2px solid ${tokens.color.teal}`, outlineOffset: 2 },
      }}
    >
      <Box
        component="img"
        src={product.imageUrl}
        alt={product.name}
        loading="lazy"
        sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
      />
      <Box sx={{ p: 2, textAlign: 'left' }}>
        {product.productType && (
          <Typography
            variant="caption"
            sx={{ color: tokens.color.teal, fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 0.5 }}
          >
            {product.productType}
          </Typography>
        )}
        <Typography variant="h4" sx={{ fontSize: '1.18rem' }}>
          {product.name}
        </Typography>
      </Box>
    </Box>
  );
}
