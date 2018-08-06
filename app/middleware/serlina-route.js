'use strict';

module.exports = () => {
  return async function serlinaRoute(ctx, next) {
    const config = ctx.app.config.serlina;
    if (config.map && config.map[ctx.path]) {
      const rendered = await ctx.app.serlina.render(config.map[ctx.path], { ctx });
      ctx.body = rendered.string;
    }

    await next();
  };
};
