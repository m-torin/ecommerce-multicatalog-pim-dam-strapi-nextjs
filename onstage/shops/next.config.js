/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: [
      'localhost:2600',
      'res.cloudinary.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
    ],
  },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: false, // Required to fix: https://nextjs.org/docs/messages/failed-loading-swc
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, {webpack}) => {
    config.plugins.push(
      // Remove node: from import specifiers, because
      // Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );
    return config;
  },
};
