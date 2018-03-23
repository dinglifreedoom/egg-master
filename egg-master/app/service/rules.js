'use strict';

const Service = require('egg').Service;
const rule_table = 'akso_rule_t';

class CurrentService extends Service {
  async index(opts = {}) {
    const { app, ctx } = this;
    const result = await app.mysql.select(rule_table, opts);
    // 获取根据数据名称获取设备类型
    for (const item of result) {
      const { result: { rows: dataConfig } } = await ctx.service.datasInfo.index({
        where: {
          pub_data_name: item.pub_data_name,
          pub_company_id: item.pub_company_id,
        },
      });
      if (dataConfig.length === 0) continue;
      item.type = dataConfig[0].type;
      item.pub_port_type = dataConfig[0].pub_port_type;
      item.pub_high_battery = dataConfig[0].pub_high_battery;
      item.pub_low_battery = dataConfig[0].pub_low_battery;
    }
    return app.standardRes(
      200,
      'success:get_rules',
      result
    );
  }
  async create(requestData) {
    const { app } = this;
    requestData = app.addDefaultTime(requestData);
    const result = await app.mysql.insert(rule_table, requestData);
    return app.standardRes(
      200,
      'success:create_rule',
      {
        id: result.insertId,
        name: requestData.pub_data_name,
      }
    );
  }
  async update(requestData) {
    const { app } = this;
    await app.mysql.update(rule_table, requestData);
    return app.standardRes(
      200,
      'success:update_rules'
    );
  }
}

module.exports = CurrentService;
