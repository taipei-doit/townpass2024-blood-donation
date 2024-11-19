/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  output: 'standalone', // docker config
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['@deck.gl/layers', '@mapbox/tiny-sdf'],
  experimental: {
    esmExternals: 'loose',
  },
  // 須設定影像位置，用於優化影像，須設定影像路徑
  // Use `<Image />` from `next/image` instead to utilize Image Optimization. See: https://nextjs.org/docs/messages/no-img-element
  // https://nextjs.org/docs/messages/next-image-unconfigured-host
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // 禁用 sitemap 功能
  // exportPathMap: () => ({}),
  // 語系設定
  i18n: {
    locales: ['en', 'zh-tw', 'jp'],
    defaultLocale: 'zh-tw',
  },
}

module.exports = nextConfig
