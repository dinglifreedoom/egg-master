'use strict';

const Service = require('egg').Service;
const data_config_table = 'akso_data_config_t';
const data_info_table = 'akso_data_info_t';

class CurrentService extends Service {
  async index(opts = {}) {
    const { app } = this;
    const origin = await app.mysql.query(
      `SELECT DISTINCT pub_device_id, pub_device_name, pub_device_kind, pub_customer_id, village_id, type 
      FROM ${data_config_table}
      WHERE village_id = ?`,
      [ opts.where.village_id ]
    );
    return app.standardRes(
      200,
      'success:get_devices',
      origin
    );
  }
  async create(requestData) {
    const { app, ctx } = this;
    const { device_list, access_token } = requestData;
    const { village_id } = device_list[0];
    await this.delete(village_id); // 清空村庄下绑定的所有设备数据
    for (const device of device_list) {
      // 获取设备数据
      const { result: { rows: dataConfigs } } = await ctx.service.public.dataConfig({
        access_token,
        value_flag: false,
        opts: { where: { device_id: device.pub_device_id } },
      });
      for (const dataConfig of dataConfigs) {
        // 获取已经存在的同名规则
        const { result: { rows: rules } } = await ctx.service.rules.index({
          where: {
            pub_data_name: dataConfig.pub_data_name,
            pub_company_id: device.pub_company_id,
          },
        });
        // 获取规则id
        let rule_id;
        if (rules.length === 0) { // 规则不存在，创建规则
          const rule = await ctx.service.rules.create({
            pub_data_name: dataConfig.pub_data_name,
            pub_company_id: device.pub_company_id,
          });
          rule_id = rule.result.id;
        } else { // 规则存在
          rule_id = rules[0].id;
        }
        const config_item = app.addDefaultTime(Object.assign({ rule_id }, device, dataConfig));
        await app.mysql.insert(data_config_table, config_item);
        // 判断本系统中数据信息是否存在
        const isInfoExisted = await app.mysql.select(data_info_table, {
          where: { pub_data_id: dataConfig.pub_data_id },
        });
        if (isInfoExisted.length === 0) {
          const info_item = app.addDefaultTime({ pub_data_id: dataConfig.pub_data_id });
          await app.mysql.insert(data_info_table, info_item);
        }
      }
    }
    return app.standardRes(
      200,
      'success:create_devices'
    );
  }
  async delete(id) {
    const { app } = this;
    const result = await app.mysql.query(`DELETE FROM ${data_config_table} WHERE village_id = ?`, [ id ]);
    return app.standardRes(
      200,
      result.affectedRows === 0 ? `error:id:${id}_not_found` : `success:delete_village_${id}`
    );
  }
}

module.exports = CurrentService;
