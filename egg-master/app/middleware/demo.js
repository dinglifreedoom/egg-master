'use strict';

module.exports = () => {
  return async (ctx, next) => {
    // const res = await this.app.mysql.select('akso_village_t');
    await next();
    console.log(ctx);
  };
};
