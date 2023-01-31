const crypto = require('node:crypto');

/**
 * Redis cache
 */
const redisCache = ({env}) => {
  return {
    config: {
      connections: {
        default: {
          connection: {
            // @see https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
            host: env('UPSTASH_REDIS_HOST', '127.0.0.1'),
            port: env('UPSTASH_REDIS_PORT', 6379),
            // db: 0,
            user: env('UPSTASH_REDIS_USERNAME'),
            password: env('UPSTASH_REDIS_PASSWORD'),
            // @see https://github.com/luin/ioredis#tls-options
            tls: {},
          },
          settings: {
            debug: false,
          },
        },
      },
    },
  };
};
const restCache = ({env}) => {
  const nodeEnvAbv = env('NODE_ENV').slice(0, 3);
  return {
    config: {
      provider: {
        name: 'redis',
        options: {
          max: 32_767,
          connection: 'default',
        },
      },
      strategy: {
        // if you are using keyPrefix for your Redis, please add <keysPrefix>
        keysPrefix: `cms${nodeEnvAbv}`,
        contentTypes: [
          {contentType: 'api::brand.brand', hitpass: false},
          {contentType: 'api::catalog.catalog', hitpass: false},
          {contentType: 'api::meta-attraction.meta-attraction', hitpass: false},
          {contentType: 'api::meta-cast.meta-cast', hitpass: false},
          {contentType: 'api::meta-chapter.meta-chapter', hitpass: false},
          {contentType: 'api::meta-destination.meta-destination', hitpass: false},
          {
            contentType: 'api::meta-entertainment.meta-entertainment',
            hitpass: false,
          },
          {contentType: 'api::meta-event.meta-event', hitpass: false},
          {contentType: 'api::meta-location.meta-location', hitpass: false},
          {contentType: 'api::meta-lodging.meta-lodging', hitpass: false},
          {contentType: 'api::meta-story.meta-story', hitpass: false},
          {contentType: 'api::meta-team.meta-team', hitpass: false},
          {
            contentType: 'api::product-collection.product-collection',
            hitpass: false,
          },
          {contentType: 'api::product-group.product-group', hitpass: false},
          {contentType: 'api::product-tag.product-tag', hitpass: false},
          {contentType: 'api::storefront.storefront', hitpass: false},
        ],
      },
    },
  };
};

const searchSettings = ({env}) => {
  return {
    enabled: env('NODE_ENV') === 'production',
    config: {
      provider: 'algolia',
      providerOptions: {
        apiKey: env('ALGOLIA_ADMIN_API_KEY'),
        applicationId: env('ALGOLIA_APPLICATION_ID'),
      },
      debug: true,
      excludedFields: [
        'createdAt',
        'createdBy',
        'id',
        'products',
        'sitemap_exclude',
        'updatedAt',
        'updatedBy',
      ],
      contentTypes: [
        {name: 'api::brand.brand', index: 'brands'},
        {name: 'api::meta-attraction.meta-attraction', index: 'attractions'},
        {name: 'api::meta-cast.meta-cast', index: 'cast'},
        {name: 'api::meta-chapter.meta-chapter', index: 'story'},
        {name: 'api::meta-destination.meta-destination', index: 'locations'},
        {name: 'api::meta-entertainment.meta-entertainment', index: 'entertainment'},
        {name: 'api::meta-event.meta-event', index: 'events'},
        {name: 'api::meta-location.meta-location', index: 'locations'},
        {name: 'api::meta-lodging.meta-lodging', index: 'lodging'},
        {name: 'api::meta-story.meta-story', index: 'story'},
        {name: 'api::meta-team.meta-team', index: 'teams'},
        {
          name: 'api::product-collection.product-collection',
          index: 'productCollections',
        },
        {name: 'api::product-group.product-group', index: 'productGroups'},
        {name: 'api::product-tag.product-tag', index: 'tags'},
        {name: 'api::storefront.storefront', index: 'storefronts'},
      ],
    },
  };
};

/**
 * Sentry error monitoring
 * https://www.npmjs.com/package/@strapi/plugin-sentry
 */
const sentrySettings = ({env}) => {
  return {
    enabled: env('NODE_ENV') === 'production',
    config: {
      dsn: env('SENTRY_DSN'),
      sendMetadata: true,
    },
  };
};

/**
 * Upload - local by default
 */
const uploadSettings = ({env}) => {
  // Disable until we can figure out why this enables local storage on false
  // Gitpod requires local storage (no GCP access)
  const isGitpod = Boolean(process.env.GITPOD_INSTANCE_ID);
  if (isGitpod || env('STRAPI_FORCE_LOCAL_UPLOADS')) {
    return {
      provider: 'local',
      providerOptions: {
        sizeLimit: 1024 * 1024 * 1024 * 2,
      },
    };
  } else {
    return {
      config: {
        breakpoints: {
          xlarge: 1500,
          large: 1000,
          medium: 750,
          small: 300,
          xsmall: 150,
        },
        provider: 'strapi-provider-upload-cloudflare-r2',
        providerOptions: {
          accessKeyId: env('R2_ACCESS_KEY_ID'),
          secretAccessKey: env('R2_ACCESS_SECRET'),
          region: env('R2_REGION'),
          params: {
            Bucket: env('R2_BUCKET'),
            accountId: env('R2_ACCOUNT_ID'),
            publicUrl: env('R2_PUBLIC_URL'),
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
    };
  }
};

/**
 * User permissions
 */
const userPermissions = ({env}) => {
  return {
    config: {
      jwtSecret:
        env('STRAPI_JWT_SECRET') || crypto.randomBytes(16).toString('base64'),
    },
  };
};

module.exports = (env) => {
  return {
    // 'import-export-entries': {enabled: true},
    'random-sort': {enabled: true},

    redis: redisCache(env),
    'rest-cache': restCache(env),
    search: searchSettings(env),
    sentry: sentrySettings(env),
    upload: uploadSettings(env),
    'users-permissions': userPermissions(env),
  };
};
