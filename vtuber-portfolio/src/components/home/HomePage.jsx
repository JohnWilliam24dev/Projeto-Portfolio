import HeroSection from './HeroSection';
import DoAndDontSection from './DoAndDontSection';
import VideoCarousel from './VideoCarousel';
import VineDivider from '../layout/VineDivider';
import PageBackground from '../layout/PageBackground';

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
