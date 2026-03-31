interface SEOHeadProps {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEOHead = ({ title, description, path = '', ogImage, noindex = false }: SEOHeadProps) => {
  const SITE = 'Digital Biz 전략세미나 | 디지털비즈니스전략세미나';
  const BASE = 'https://digitalbiz.dreamitbiz.com';
  const DEFAULT_DESC = '디지털 시대의 비즈니스 전략을 설계하다 - 디지털 트랜스포메이션, 플랫폼 비즈니스, AI 혁신까지 한곳에서';
  const fullTitle = title ? `${title} | ${SITE}` : SITE;
  const desc = description || DEFAULT_DESC;
  const image = ogImage || `${BASE}/og-image.png`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${BASE}${path}`} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`${BASE}${path}`} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Digital Biz 전략세미나" />
      <meta property="og:locale" content="ko_KR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export default SEOHead;
