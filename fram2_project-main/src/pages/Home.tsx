import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { DestinationSection } from '../components/DestinationSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ActivitiesSection } from '../components/ActivitiesSection';
import { MembershipSection } from '../components/MembershipSection';
import { KnowledgeSection } from '../components/KnowledgeSection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DestinationSection />
      <FeaturesSection />
      <ActivitiesSection />
      <MembershipSection />
      <KnowledgeSection />
      <Footer />
    </div>
  );
}
