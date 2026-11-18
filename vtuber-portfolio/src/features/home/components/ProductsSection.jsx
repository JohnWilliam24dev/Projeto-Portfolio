import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { usePortfolioProducts } from '../../products/hooks/usePortfolioProducts';
import ProductCard from '../../products/components/ProductCard';
import { tokens } from '../../../core/config/theme';

export default function ProductsSection() {
  const { products, hasMore, loading, loadingMore, error, loadMore, reload } =
    usePortfolioProducts();

  return (
    <Box component="section" id="produtos" sx={{ width: 'min(1180px, 90vw)', mx: 'auto', px: 0, py: { xs: 7, md: 12 } }}>
      <Typography variant="overline" sx={{ color: tokens.color.teal, letterSpacing: '0.22em', fontWeight: 800 }}>
        Portfólio
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '4.3rem' }, lineHeight: .95, mb: 4 }}>
        Produtos
      </Typography>

      {loading ? (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 4 }}>
          <CircularProgress size={28} color="secondary" />
          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Carregando produtos do portfólio…
          </Typography>
        </Stack>
      ) : error ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={reload}>
              Tentar novamente
            </Button>
          }
        >
          {error}
        </Alert>
      ) : products.length === 0 ? (
        <Typography variant="body1" sx={{ color: tokens.color.textMuted }}>
          Nenhum produto publicado no portfólio até o momento.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>

          {hasMore && (
            <Stack alignItems="center" sx={{ mt: 5 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Carregando…' : 'Carregar mais produtos'}
              </Button>
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}
