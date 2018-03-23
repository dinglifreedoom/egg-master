'use strict';

const { Controller } = require('egg');
const filename = 'recordsAlarm';

class CurrentController extends Controller {
  async index() {
    const { ctx } = this;
    const { actk: access_token } = ctx.request.headers;
    const { opts = '{}' } = ctx.query;
    const requestData = { access_token, opts: JSON.parse(opts) };
    const result = await ctx.service[filename].index(requestData);
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
