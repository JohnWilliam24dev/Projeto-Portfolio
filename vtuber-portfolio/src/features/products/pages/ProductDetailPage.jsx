import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageBackground from '../../../core/layouts/PageBackground';
import ProductGallery from '../components/ProductGallery';
import { getProductById } from '../../../domain/products';
import { tokens } from '../../../core/config/theme';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);

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
            <ProductGallery imagePublicIds={product.imagePublicIds} productName={product.name} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, mb: 2 }}>
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: tokens.color.textMuted, lineHeight: 1.7 }}
            >
              {product.description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </PageBackground>
  );
}
