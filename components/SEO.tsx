import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
  const fullTitle = `${title} | Career & Business Advisor`
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      {ogImage && <meta property="og:image" content={`${siteUrl}${ogImage}`} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />}
    </Head>
  )
}

