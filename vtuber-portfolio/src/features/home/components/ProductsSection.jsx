import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PRODUCT_CATALOG } from '../../../domain/products';
import ProductCard from '../../products/components/ProductCard';
import { tokens } from '../../../core/config/theme';

export default function ProductsSection() {
  return (
    <Box component="section" sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
      <Typography variant="overline" sx={{ color: tokens.color.teal, letterSpacing: '0.25em' }}>
        Portfólio
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, mb: 4 }}>
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
