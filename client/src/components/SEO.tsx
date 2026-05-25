/* SEO — Soft Ink design system
   Reusable per-page meta tag, Open Graph, Twitter Card, and JSON-LD structured data component.
   Wraps react-helmet-async to inject head elements per route. */
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://stubborndragonflies.com";
const SITE_NAME = "Stubborn Dragonflies";
const DEFAULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_hero_dragonfly-7mVczYpUh8eK6HFHV9h2zg.webp";
const TWITTER_HANDLE = "@stubbornflies";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  schema?: object | object[];
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  schema,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title.includes("Stubborn Dragonflies")
    ? title
    : `${title} | Stubborn Dragonflies`;
  const canonicalUrl = `${SITE_URL}${path}`;

  const schemaArray = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  // Always inject WebSite schema on every page for AI engine brand recognition
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Tiny resets for stubborn humans. Build smaller offline rituals, no-shame restart rules, and realistic digital boundaries.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/quiz`,
      "query-input": "required name=search_term_string",
    },
  };

  const allSchemas = [websiteSchema, ...schemaArray];

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
