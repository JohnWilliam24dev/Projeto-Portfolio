import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PRODUCT_CATALOG } from '../../../domain/products';
import ProductCard from '../../products/components/ProductCard';
import { tokens } from '../../../core/config/theme';

export default function ProductsSection() {
  return (
    <Box component="section" id="produtos" sx={{ width: 'min(1180px, 90vw)', mx: 'auto', px: 0, py: { xs: 7, md: 12 } }}>
      <Typography variant="overline" sx={{ color: tokens.color.teal, letterSpacing: '0.22em', fontWeight: 800 }}>
        Portfólio
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '4.3rem' }, lineHeight: .95, mb: 4 }}>
        Produtos
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
        }}
      >
        {PRODUCT_CATALOG.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
