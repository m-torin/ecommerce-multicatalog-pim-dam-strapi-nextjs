module.exports = ({env}) => {
  return [
    // The array is pre-populated with internal, built-in middlewares, prefixed by `strapi::`
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'dl.airtable.com',
              '*.agrippan.com',
              'ecommerce-multicatalog-pim-strapi-nextjs.fly.dev',
              env('R2_PUBLIC_URL')?.replace(/^https?:\/\//, ''),
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'dl.airtable.com',
              '*.agrippan.com',
              'ecommerce-multicatalog-pim-strapi-nextjs.fly.dev',
              env('R2_PUBLIC_URL')?.replace(/^https?:\/\//, ''),
            ],
            'script-src': [
              "'self'",
              "'unsafe-inline'",
              'blob:',
              'ecommerce-multicatalog-pim-strapi-nextjs.agrippan.com',
              'ecommerce-multicatalog-pim-strapi-nextjs.fly.dev',
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    // custom configuration for internal middleware
    {
      name: 'strapi::poweredBy',
      config: {
        poweredBy: 'm-torin',
      },
    },
    // remaining internal & built-in middlewares
    'strapi::logger',
    'strapi::query',
    {
      name: 'strapi::body',
      config: {jsonLimit: '50mb'},
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
