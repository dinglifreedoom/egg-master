'use strict';

const { Controller } = require('egg');
const filename = 'recordsTransport';

class CurrentController extends Controller {
  async create() {
    const { ctx } = this;
    const requestData = ctx.request.body;
    const result = await ctx.service[filename].create(requestData);
    ctx.body = result;
  }
}

module.exports = CurrentController;
