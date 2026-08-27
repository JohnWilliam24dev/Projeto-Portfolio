import HeroSection from '../components/HeroSection';
import VideoCarousel from '../components/VideoCarousel';
import ProductsSection from '../components/ProductsSection';
import DoAndDontSection from '../components/DoAndDontSection';
import VineDivider from '../../../core/layouts/VineDivider';
import PageBackground from '../../../core/layouts/PageBackground';
import ScrollToTopButton from '../../../core/layouts/ScrollToTopButton';

export default function HomePage() {
  return (
    <PageBackground>
      <HeroSection />
      <VineDivider sx={{ maxWidth: 700, mx: 'auto' }} />
      <VideoCarousel videos={[]} />
      <VineDivider flip sx={{ maxWidth: 700, mx: 'auto' }} />
      <ProductsSection />
      <VineDivider sx={{ maxWidth: 700, mx: 'auto' }} />
      <DoAndDontSection />
      <ScrollToTopButton />
    </PageBackground>
  );
}
