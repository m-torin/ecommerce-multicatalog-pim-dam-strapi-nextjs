'use strict';

/**
 * meta-thing service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::meta-thing.meta-thing');
