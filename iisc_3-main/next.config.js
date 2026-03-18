/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@nivo/core',
    '@nivo/geo',
    '@nivo/sankey',
    '@nivo/legends',
    '@nivo/colors',
    '@nivo/tooltip',
    'd3-scale',
    'd3-color',
    'd3-interpolate',
    'd3-format',
    'd3-time',
    'd3-time-format',
    'd3-geo',
    'd3-shape',
    'd3-path',
    'd3-array',
  ],
  experimental: {
    // appDir: true
    externalDir: true,
    esmExternals: 'loose',
  },
  // images: {
  //   domains: ["https://oaidalleapiprodscus.blob.core.windows.net"],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'oaidalleapiprodscus.blob.core.windows.net',
  //       port: '',
  //       pathname: '**',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
