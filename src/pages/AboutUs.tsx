import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { AboutHero } from '../components/AboutHero';
import { AboutPurpose } from '../components/AboutPurpose';
import { AboutStats } from '../components/AboutStats';
import { AboutWhoWeAre } from '../components/AboutWhoWeAre';
import { AboutFacilities } from '../components/AboutFacilities';
import { AboutTeam } from '../components/AboutTeam';
import { AboutBuilding } from '../components/AboutBuilding';
import { AboutEurope } from '../components/AboutEurope';
import { AboutValues } from '../components/AboutValues';
import { Footer } from '../components/Footer';

interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  whoHeading: string;
  whoParagraph1: string;
  whoParagraph2: string;
  whoParagraph3: string;
  stats: { number: string; label: string }[];
  buildingHeading: string;
  buildingSubtitle: string;
  europeHeading: string;
  europeAddressLine1: string;
  europeAddressLine2: string;
  europeFeatures: { title: string; description: string }[];
  valuesHeading: string;
  values: { title: string; description: string }[];
}

export default function AboutUs() {
  const [content, setContent] = useState<AboutPageContent | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get('/api/about/content');
        const data = response.data as Record<string, string>;
        const mapped: AboutPageContent = {
          heroTitle: data['about.hero.title'] ?? 'About',
          heroSubtitle: data['about.hero.subtitle'] ?? 'Little moments of greatness',
          whoHeading: data['about.who_we_are.heading'] ?? 'Who we are',
          whoParagraph1:
            data['about.who_we_are.paragraph_1'] ??
            "We're Frame 2 Complex - a premier sports and recreation center located in Bradford, United Kingdom. We're dedicated to providing exceptional sporting facilities and entertainment options for individuals, families, and teams who are passionate about an active lifestyle.",
          whoParagraph2:
            data['about.who_we_are.paragraph_2'] ??
            "Our complex is more than just a sports venue. It's a destination where athletes, gamers, and sports enthusiasts of all levels come together to pursue their passions, compete, train, and create lasting memories. From competitive matches to casual fun, we offer something for everyone.",
          whoParagraph3:
            data['about.who_we_are.paragraph_3'] ??
            'With professional-grade football grounds, a premier cricket field, dedicated boxing facilities, premium snooker tables, a cutting-edge game arena, and comfortable accommodation rooms, we provide everything you need for sports, recreation, and relaxation - all in one convenient location.',
          stats: [
            {
              number: data['about.stats.1.number'] ?? '6',
              label: data['about.stats.1.label'] ?? 'Premium Facilities',
            },
            {
              number: data['about.stats.2.number'] ?? '5000+',
              label: data['about.stats.2.label'] ?? 'Happy Visitors',
            },
            {
              number: data['about.stats.3.number'] ?? '50+',
              label: data['about.stats.3.label'] ?? 'Expert Staff',
            },
          ],
          buildingHeading:
            data['about.building.heading'] ?? 'Premium facilities designed for you',
          buildingSubtitle:
            data['about.building.subtitle'] ??
            'Every detail matters when creating spaces for sports and recreation',
          europeHeading:
            data['about.europe.heading'] ?? 'Your Premier Sports Complex in Bradford',
          europeAddressLine1:
            data['about.europe.address_line1'] ?? 'Feather Rd, Bradford BD3 9DJ',
          europeAddressLine2:
            data['about.europe.address_line2'] ?? 'United Kingdom',
          europeFeatures: [1, 2, 3, 4].map((i) => ({
            title:
              data[`about.europe.features.${i}.title`] ??
              ['Prime Location', 'Extended Hours', 'Online Booking', 'Free WiFi'][
                i - 1
              ],
            description:
              data[`about.europe.features.${i}.description`] ??
              [
                'Easy access from Bradford city center',
                'Open 7 days a week',
                'Book facilities anytime',
                'Stay connected throughout',
              ][i - 1],
          })),
          valuesHeading: data['about.values.heading'] ?? 'Our Values',
          values: [1, 2, 3, 4].map((i) => ({
            title:
              data[`about.values.${i}.title`] ??
              ['Passion', 'Community', 'Excellence', 'Experience'][i - 1],
            description:
              data[`about.values.${i}.description`] ??
              [
                'We love sports and recreation, and it shows in everything we create - from our facilities to our visitor experiences.',
                'We bring people together, creating spaces where friendships form, teams unite, and families enjoy quality time.',
                'We never settle for good enough. We constantly maintain and improve our facilities to deliver the very best.',
                "We believe in creating memorable moments - whether you're playing, training, gaming, or simply relaxing.",
              ][i - 1],
          })),
        };
        setContent(mapped);
      } catch {
        // ignore errors and fall back to defaults in components
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutHero
        title={content?.heroTitle}
        subtitle={content?.heroSubtitle}
      />
      <AboutPurpose />
      <AboutStats stats={content?.stats} />
      <AboutWhoWeAre
        heading={content?.whoHeading}
        paragraph1={content?.whoParagraph1}
        paragraph2={content?.whoParagraph2}
        paragraph3={content?.whoParagraph3}
      />
      <AboutFacilities />
      <AboutTeam />
      <AboutBuilding
        heading={content?.buildingHeading}
        subtitle={content?.buildingSubtitle}
      />
      <AboutEurope
        heading={content?.europeHeading}
        addressLine1={content?.europeAddressLine1}
        addressLine2={content?.europeAddressLine2}
        features={content?.europeFeatures}
      />
      <AboutValues
        heading={content?.valuesHeading}
        values={content?.values}
      />
      <Footer />
    </div>
  );
}
