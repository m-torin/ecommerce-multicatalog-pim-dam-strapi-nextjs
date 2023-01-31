'use strict';

/**
 *  brand controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::brand.brand');
module.exports = createCoreController('api::brand.brand', ({strapi}) => {
  return {
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      console.log('ctx', ctx);

      // try {
      //   ctx.body = 'ok';
      // } catch (err) {
      //   ctx.body = err;
      // }
    },

    // Method 2: Wrapping a core action (leaves core logic in place)
    //   async find(ctx) {
    //     // some custom logic here
    //     ctx.query = { ...ctx.query, local: 'en' };
    //     // Calling the default core action
    //     const { data, meta } = await super.find(ctx);
    //     // some more custom logic
    //     meta.date = Date.now();
    //     return { data, meta };
    //   },
  };
});
