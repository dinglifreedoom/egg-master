'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  async index(filename) {
    const { ctx } = this;
    const result = await ctx.service[filename].index();
    ctx.body = result;
  }
  async show(filename) {
    const { ctx } = this;
    const requestData = ctx.params.id;
    const result = await ctx.service[filename].show(requestData);
    ctx.body = result;
  }
  async create(filename) {
    const { ctx } = this;
    const requestData = ctx.request.body;
    const result = await ctx.service[filename].create(requestData);
    ctx.body = result;
  }
  async update(filename) {
    const { ctx } = this;
    const id = ctx.params.id;
    const requestData = ctx.request.body;
    const result = await ctx.service[filename].update(id, requestData);
    ctx.body = result;
  }
  async delete(filename) {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await ctx.service[filename].delete(id);
    ctx.body = result;
  }
}

module.exports = BaseController;
