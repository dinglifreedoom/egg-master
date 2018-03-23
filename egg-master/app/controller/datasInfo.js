'use strict';

const { Controller } = require('egg');
const filename = 'datasInfo';

class CurrentController extends Controller {
  async index() {
    const { ctx } = this;
    let { opts = '{}' } = ctx.query;
    opts = JSON.parse(opts);
    const result = await ctx.service[filename].index(opts);
    ctx.body = result;
  }
  async update() {
    const { ctx } = this;
    const requestData = ctx.request.body;
    const result = await ctx.service[filename].update(requestData);
    ctx.body = result;
  }
}

module.exports = CurrentController;
