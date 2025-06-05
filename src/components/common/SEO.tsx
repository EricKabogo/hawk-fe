import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
}

export default function SEO({
  title,
  description,
  canonical,
  image = '/images/hawk-life-og.jpg', // Default OG image
  type = 'website'
}: SEOProps) {
  const siteTitle = `${title} | Hawk Life Solutions`;
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
}