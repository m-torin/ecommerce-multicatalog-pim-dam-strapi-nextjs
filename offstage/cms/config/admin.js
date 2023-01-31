module.exports = ({env}) => {
  return {
    auth: {
      secret: env('STRAPI_ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('STRAPI_API_TOKEN_SALT'),
    },
    autoOpen: false,
    url: '/pim', // Note: The administration will be accessible from the root of the domain (ex: http://yourfrontend.com/)
    serveAdminPanel: env('STRAPI_SERVE_ADMIN', true), // http://yourbackend.com will not serve any static admin files
    watchIgnoreFiles: [
      '**/config/sync/**',
      '**/Dockerfile',
      '**/export_*',
      '**/package.json',
      '**/yarn.lock',
    ],
  };
};
