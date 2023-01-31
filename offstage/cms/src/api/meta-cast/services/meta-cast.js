'use strict';

/**
 * meta-cast service.
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::meta-cast.meta-cast');
