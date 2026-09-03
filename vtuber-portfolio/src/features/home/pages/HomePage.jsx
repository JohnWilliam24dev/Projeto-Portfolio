import HeroSection from '../components/HeroSection';
import VideoCarousel from '../components/VideoCarousel';
import ProductsSection from '../components/ProductsSection';
import ProcessSection from '../components/ProcessSection';
import DoAndDontSection from '../components/DoAndDontSection';
import Header from '../../../core/layouts/Header';
import PageBackground from '../../../core/layouts/PageBackground';
import ScrollToTopButton from '../../../core/layouts/ScrollToTopButton';
import { portfolioVideos } from '../../../shared/utils/profileContent';

export default function HomePage() {
  return (
    <PageBackground>
      <Header />
      <HeroSection />
      <VideoCarousel videos={portfolioVideos} />
      <ProcessSection />
      <ProductsSection />
      <DoAndDontSection />
      <ScrollToTopButton />
    </PageBackground>
  );
}
