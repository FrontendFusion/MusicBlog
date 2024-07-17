'use strict';

/**
 * picture-wall service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::picture-wall.picture-wall');
