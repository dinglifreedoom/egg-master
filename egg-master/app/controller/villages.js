'use strict';

const { Controller } = require('egg');
const filename = 'villages';

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
  async update() {
    const { ctx } = this;
    const requestData = ctx.request.body;
    const result = await ctx.service[filename].update(requestData);
    ctx.body = result;
  }
  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await ctx.service[filename].delete(id);
    ctx.body = result;
  }
}

module.exports = CurrentController;
