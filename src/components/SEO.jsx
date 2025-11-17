import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, image, url, type = 'website', children }) => {
  const siteName = 'MOH BOUTIQUE';
  const fullTitle = `${title} | ${siteName}`;
  const defaultDescription = 'Découvrez les dernières tendances mode à Abidjan. Vêtements, accessoires et plus encore. Livraison rapide et paiement sécurisé.';
  const defaultImage = 'https://images.unsplash.com/photo-1695342911923-edb99ff2947d'; // Placeholder image

  const meta = {
    title: fullTitle,
    description: description || defaultDescription,
    keywords: keywords || 'mode, abidjan, vêtements, boutique, e-commerce, style',
    image: image || defaultImage,
    url: url || window.location.href,
  };

  return (
    <Helmet>
      <html lang="fr" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={meta.url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      
      {children}
    </Helmet>
  );
};

export const JsonLd = ({ data }) => (
  <script type="application/ld+json">
    {JSON.stringify(data)}
  </script>
);

export default SEO;