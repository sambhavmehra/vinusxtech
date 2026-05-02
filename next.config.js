/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['three'],

  // non-www → www 301 redirect (www.vinusxtech.me is primary)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vinusxtech.me' }],
        destination: 'https://www.vinusxtech.me/:path*',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

module.exports = nextConfig;
