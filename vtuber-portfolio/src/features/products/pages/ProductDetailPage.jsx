import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageBackground from '../../../core/layouts/PageBackground';
import ProductGallery from '../components/ProductGallery';
import { fetchPortfolioProductById } from '../services/portfolioService';
import { tokens } from '../../../core/config/theme';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialProduct = location.state?.product ?? null;

  const [product, setProduct] = useState(
    initialProduct && initialProduct.id === productId ? initialProduct : null
  );
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product && product.id === productId) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    fetchPortfolioProductById(productId)
      .then((found) => {
        if (active) setProduct(found);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar o produto.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [product, productId]);

  if (loading) {
    return (
      <PageBackground>
        <Stack alignItems="center" spacing={2} sx={{ py: 12 }}>
          <CircularProgress color="secondary" />
          <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
            Carregando detalhes do produto…
          </Typography>
        </Stack>
      </PageBackground>
    );
  }

  if (error) {
    return (
      <PageBackground>
        <Box sx={{ maxWidth: 640, mx: 'auto', px: { xs: 3, md: 0 }, py: 10 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
            Voltar para a home
          </Button>
        </Box>
      </PageBackground>
    );
  }

  if (!product) {
    return (
      <PageBackground>
        <Box sx={{ maxWidth: 640, mx: 'auto', px: { xs: 3, md: 0 }, py: 10, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: '1.8rem', mb: 2 }}>
            Produto não encontrado
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
            Voltar para a home
          </Button>
        </Box>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 3, md: 0 }, py: { xs: 6, md: 8 } }}>
        <Button
          variant="text"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, color: tokens.color.textMuted }}
        >
          Voltar
        </Button>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ProductGallery images={[product.imageUrl]} productName={product.name} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {product.productType && (
              <Chip
                label={product.productType}
                size="small"
                sx={{
                  mb: 2,
                  color: tokens.color.teal,
                  borderColor: 'rgba(99,226,242,.35)',
                  backgroundColor: 'rgba(32,176,202,.12)',
                }}
                variant="outlined"
              />
            )}
            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, mb: 2 }}>
              {product.name}
            </Typography>
            {product.description ? (
              <Typography
                variant="body1"
                sx={{ color: tokens.color.textMuted, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}
              >
                {product.description}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: tokens.color.textMuted }}>
                Sem descrição adicional.
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </PageBackground>
  );
}
