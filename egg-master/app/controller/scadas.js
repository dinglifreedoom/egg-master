'use strict';

const { Controller } = require('egg');
const filename = 'scadas';

class CurrentController extends Controller {
  async index() {
    const { ctx } = this;
    const { opts = '{}' } = ctx.query;
    const requestData = JSON.parse(opts);
    const result = await ctx.service[filename].index(requestData);
    ctx.body = result;
  }
  async create() {
    const { ctx } = this;
    const requestData = ctx.request.body;
    const result = await ctx.service[filename].create(requestData);
    ctx.body = result;
  }
}

module.exports = CurrentController;
