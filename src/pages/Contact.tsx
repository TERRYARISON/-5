import ContactHero from '@/sections/contact/ContactHero';
import ContactForm from '@/sections/contact/ContactForm';
import SectionNav from '@/components/SectionNav';
import FooterNote from '@/sections/contact/FooterNote';

/**
 * Contact — `/contact` (contact.md). Quiet closing page: studio portrait
 * hero with direct channels, a glass transmission form, and the violet
 * manifesto echo.
 */
export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <FooterNote />
      <SectionNav />
    </>
  );
}
