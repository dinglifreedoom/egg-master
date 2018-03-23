'use strict';

const Controller = require('egg').Controller;
const filename = 'public';

class CurrentController extends Controller {

  // 登陆
  async login() {
    const { ctx } = this;
    const { body } = ctx.request;
    const result = await ctx.service[filename].login(body);
    ctx.body = result;
  }

  // 获取权限菜单
  async root() {
    const { ctx } = this;
    const { actk: access_token } = ctx.request.headers;
    const requestData = { access_token };
    const result = await ctx.service[filename].root(requestData);
    ctx.body = result;
  }

  // 获取公司下的账户
  async user() {
    const { ctx } = this;
    const { actk: access_token } = ctx.request.headers;
    const { company_id } = ctx.query;
    const { opts = '{}' } = ctx.query;
    const requestData = { access_token, filter: { company_id }, opts: JSON.parse(opts) };
    const result = await ctx.service[filename].user(requestData);
    ctx.body = result;
  }

  // 修改密码
  async password() {
    const { ctx } = this;
    const { actk: access_token } = ctx.request.headers;
    const { old_password, new_password } = ctx.request.body;
    const confirm_password = new_password;
    const requestData = { access_token, old_password, new_password, confirm_password };
    const result = await ctx.service[filename].password(requestData);
    ctx.body = result;
  }

  // 修改密码
  async forget() {
    const { ctx } = this;
    const { username = '', system = '' } = ctx.request.body;
    const requestData = { filter: { username, system } };
    const result = await ctx.service[filename].forget(requestData);
    ctx.body = result;
  }

  // 获取天气
  async weather() {
    const { ctx } = this;
    const { city_id } = ctx.query;
    const requestData = { city_id };
    const result = await ctx.service[filename].weather(requestData);
    ctx.body = result;
  }

  // 获取设备
  async device() {
    const { ctx } = this;
    const { actk: access_token } = ctx.request.headers;
    const { opts = '{}' } = ctx.query;
    const requestData = { access_token, opts: JSON.parse(opts) };
    const result = await ctx.service[filename].device(requestData);
    ctx.body = result;
  }

  // 获取数据
  async dataConfig() {
    const { ctx } = this;
    const { actk: access_token } = ctx.request.headers;
    const { opts = '{}' } = ctx.query;
    const requestData = { access_token, opts: JSON.parse(opts) };
    const result = await ctx.service[filename].dataConfig(requestData);
    ctx.body = result;
  }

}

module.exports = CurrentController;
