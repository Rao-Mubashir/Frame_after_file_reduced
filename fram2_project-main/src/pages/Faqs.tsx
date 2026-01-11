import { Navbar } from '../components/Navbar';
import { FaqHero } from '../components/FaqHero';
import { FaqAccordion } from '../components/FaqAccordion';
import { Footer } from '../components/Footer';

export default function Faqs() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <FaqHero />
      <FaqAccordion />
      <Footer />
    </div>
  );
}
