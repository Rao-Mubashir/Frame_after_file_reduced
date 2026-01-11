import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { ContactHero } from '../components/ContactHero';
import { ContactForm } from '../components/ContactForm';
import { ContactMap } from '../components/ContactMap';
import { Footer } from '../components/Footer';

interface ContactSettings {
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
}

export default function ContactUs() {
  const [contact, setContact] = useState<ContactSettings | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get('/api/contact/settings');
        setContact(response.data as ContactSettings);
      } catch {
        // ignore and use defaults
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactForm contact={contact ?? undefined} />
      <ContactMap contact={contact ?? undefined} />
      <Footer />
    </div>
  );
}
