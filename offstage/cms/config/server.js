module.exports = ({env}) => {
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 2200),
    app: {
      keys: env.array('STRAPI_APP_KEYS'),
    },
  };
};
