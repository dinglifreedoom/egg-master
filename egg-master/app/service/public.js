'use strict';

const Service = require('egg').Service;

class CurrentService extends Service {
  async login(body) {
    const { ctx, app } = this;
    Object.assign(body, app.config.client);
    const serverAPI = app.serializeQuary(`${app.config.serverList.devValidate}/authorize/authorize`, body);
    const { data } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    const { fullname, city_id, company_location, menus, company_id, customer_id, access_token, address, _id: pub_user_id } = data;
    return app.standardRes(
      data.code,
      data.code === 200 ? 'success:post_login' : data.error,
      { fullname, city_id, company_location, menus, company_id, customer_id, actk: access_token, address, pub_user_id }
    );
  }
  async root(requestData) {
    const { app, ctx } = this;
    const serverAPI = app.serializeQuary(`${app.config.serverList.devValidate}/v1/menus`, requestData);
    const { data } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    const dispose = data.sort((a, b) => {
      return a.index - b.index;
    });
    return app.standardRes(
      200,
      'success:get_root',
      dispose
    );
  }
  async user(requestData) {
    const { app, ctx } = this;
    const { opts: { where = {} } } = requestData;
    const serverAPI = app.serializeQuary(`${app.config.serverList.devManager}/v1/users`, requestData);
    const { data } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    if (where.pub_user_id) {
      const user = data.rows.filter(item => {
        return item._id === where.pub_user_id;
      });
      return app.standardRes(
        200,
        'success:get_user',
        user
      );
    }
    return app.standardRes(
      200,
      'success:get_user',
      data
    );
  }
  async password(requestData) {
    const { app, ctx } = this;
    const serverAPI = app.serializeQuary(`${app.config.serverList.devManager}/v1/users`, requestData);
    const { data } = await ctx.curl(serverAPI, {
      method: 'PUT',
      dataType: 'json',
      timeout: 30000,
    });
    return app.standardRes(
      data.code,
      data.error ? data.error : 'success:changed_password'
    );
  }
  async forget(requestData) {
    const { app, ctx } = this;
    const serverAPI = app.serializeQuary(`${app.config.serverList.devValidate}/v1/emails`, requestData);
    const { data } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    return app.standardRes(
      data.code,
      data.success || data.error
    );
  }
  async weather(requestData) {
    const { app, ctx } = this;
    const serverAPI = app.serializeQuary(`${app.config.serverList.ofcManager}/v1/weathers`, requestData);
    const { data } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    if (data.code === 404) {
      return app.standardRes(
        data.code,
        `error:${data.error}`
      );
    }
    const { weather, img, templow, temphigh } = data;
    return app.standardRes(
      200,
      'success:get_weather',
      { weather, img, templow, temphigh }
    );
  }
  async device(requestData) { // 支持opts={where, columns}
    const { app, ctx } = this;
    const { opts = {} } = requestData;
    const { where = {} } = opts;
    if (where && app.superType(where.device_kind) === 'array') {
      requestData.device_kind = where.device_kind.toString();
      delete where.device_kind;
    }
    const serverAPI = app.serializeQuary(`${app.config.serverList.devManager}/v1/devices`, app.filterFormater(requestData));
    let { data: { rows } } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    rows = rows.map(item => {
      return {
        pub_device_id: item._id,
        pub_device_name: item.device_name,
        pub_device_kind: item.device_kind,
        pub_customer_id: item.customer_id,
      };
    });
    rows = app.columnsFormater(rows, opts.columns);
    return app.standardRes(
      200,
      'success:get_device',
      rows
    );
  }
  async dataConfig(requestData) {
    const { app, ctx } = this;
    const { opts = {} } = requestData;
    const serverAPI = app.serializeQuary(`${app.config.serverList.devManager}/v1/dataConfigs`, app.filterFormater(requestData));
    let { data: { rows } } = await ctx.curl(serverAPI, {
      method: 'GET',
      dataType: 'json',
      timeout: 30000,
    });
    rows = rows.map(item => {
      return {
        pub_data_id: item.data_id,
        pub_data_name: item.data_name,
        pub_data_unit: item.data_unit,
        pub_high_battery: item.high_battery,
        pub_low_battery: item.low_battery,
        pub_data_precision: item.data_precision,
        pub_port_type: item.port_type,
      };
    });
    rows = app.columnsFormater(rows, opts.columns);
    return app.standardRes(
      200,
      'success:get_device',
      rows
    );
  }
}

module.exports = CurrentService;
