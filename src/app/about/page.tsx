import AboutClient from './AboutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Finance Company in Agra | 5-Day Home Loans | Bhardwaj Finance',
  description: 'Looking for the best finance company in Agra, India? Bhardwaj Finance (BFS) offers transparent, lowest interest home loans with a guaranteed 5-day sanction. DSA Approved.',
  keywords: 'best finance company in agra, home loans agra, fast loan approval india, dsa approved finance agra, bhardwaj finance, low interest home loans agra, mathura, noida, gurgaon, mumbai, bangalore, jaipur',
  openGraph: {
    title: 'Best Finance Company in Agra | Bhardwaj Finance',
    description: 'Bhardwaj Finance (BFS) offers transparent, lowest interest home loans with a guaranteed 5-day sanction. DSA Approved and partnered with top banks across India.',
    url: 'https://bfsagra.com/about',
    siteName: 'Bhardwaj Finance',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Bhardwaj Finance (BFS)',
    image: 'https://bfsagra.com/logo.png',
    description: 'Bhardwaj Finance offers transparent, lowest interest home loans with a guaranteed 5-day sanction. We are a DSA Approved financial partner.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sanjay Place',
      addressLocality: 'Agra',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.1994', // Approx coordinates for Sanjay Place, Agra
      longitude: '78.0053',
    },
    url: 'https://bfsagra.com',
    telephone: '+919876543210', // Placeholder
    founder: {
      '@type': 'Person',
      name: 'Mrs. Vinita Sharma',
      jobTitle: 'Owner',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Agra',
      },
      {
        '@type': 'City',
        name: 'Mathura',
      },
      {
        '@type': 'City',
        name: 'Noida',
      },
      {
        '@type': 'City',
        name: 'Gurgaon',
      },
      {
        '@type': 'City',
        name: 'Mumbai',
      },
      {
        '@type': 'City',
        name: 'Bangalore',
      },
      {
        '@type': 'City',
        name: 'Jaipur',
      }
    ],
    knowsAbout: [
      'Home Loans',
      'Personal Loans',
      'Business Loans',
      'DSA Approval',
      'Fast Loan Sanctioning',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
