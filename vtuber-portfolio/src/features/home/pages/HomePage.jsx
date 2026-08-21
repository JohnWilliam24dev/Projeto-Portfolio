import HeroSection from '../components/HeroSection';
import DoAndDontSection from '../components/DoAndDontSection';
import VideoCarousel from '../components/VideoCarousel';
import VineDivider from '../../../core/layouts/VineDivider';
import PageBackground from '../../../core/layouts/PageBackground';

export default function HomePage() {
  return (
    <PageBackground>
      <HeroSection />
      <VineDivider sx={{ maxWidth: 700, mx: 'auto' }} />
      <DoAndDontSection />
      <VineDivider flip sx={{ maxWidth: 700, mx: 'auto' }} />
      <VideoCarousel videos={[]} />
    </PageBackground>
  );
}
