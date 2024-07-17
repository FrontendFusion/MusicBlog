"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    const nowData = data.map((item) => {
      const { type, title, content, time } = item.attributes;
      return { id: item.id, type, title, content, time: time };
    });
    return {
      data: nowData.sort((a, b) => b.time - a.time),
      pagination: meta.pagination,
      code: 200,
      message: "success",
    };
  },
}));
