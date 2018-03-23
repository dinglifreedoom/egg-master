'use strict';

const Service = require('egg').Service;
const village_table = 'akso_village_t';
const record_maintain_table = 'akso_record_maintain_t';

class CurrentService extends Service {
  async index(opts = {}) {
    const { app, ctx } = this;
    let result = await app.mysql.select(record_maintain_table, opts);
    for (const record of result) {
      // 获取对应村庄名称
      const villages = await app.mysql.select(village_table, {
        where: { id: record.village_id },
      });
      record.village_name = villages[0].name;
      // 获取对应设备类型以及数据名称
      const { result: { rows } } = await ctx.service.datasInfo.index({
        where: {
          village_id: record.village_id,
          pub_data_id: record.pub_data_id,
        },
      });
      record.type = rows[0].type;
      record.pub_data_name = rows[0].pub_data_name;
    }
    if (opts.like && opts.like.village_name) {
      result = result.filter(item => item.village_name.includes(opts.like.village_name));
    }
    if (opts.limit > 0) {
      result = {
        total: result.length,
        rows: result.splice(opts.offset, (opts.offset + 1) * opts.limit),
      };
    }
    return app.standardRes(
      200,
      'success:get_recordsMaintain',
      result
    );
  }
  async create(requestData) {
    const { app } = this;
    const dataWithDefault = app.addDefaultTime(requestData);
    const result = await app.mysql.insert(record_maintain_table, dataWithDefault);
    return app.standardRes(
      200,
      'success:create_recordMaintain',
      {
        id: result.insertId,
        name: requestData.name,
      }
    );
  }
  async update(requestData) {
    const { app } = this;
    const type = app.superType(requestData);
    if (type === 'object') {
      requestData = app.addUpdateTime(requestData);
      const result = await app.mysql.update(record_maintain_table, requestData);
      return app.standardRes(
        200,
        result.affectedRows === 0 ? `error:id:${requestData.id}_not_found` : `success:update_recordMaintain_${requestData.id}`
      );
    } else if (type === 'array') {
      const result = await Promise.all(requestData.map(single => {
        return app.mysql.update(record_maintain_table, single);
      }));
      let isError = false;
      result.forEach(item => {
        if (item.affectedRows === 0) {
          isError = true;
          return;
        }
      });
      return app.standardRes(
        200,
        isError ? 'error:update_failed' : 'success:update_recordsMaintain'
      );
    }
  }
  async delete(id) {
    const { app } = this;
    const requestData = {
      id,
      available: false,
    };
    const result = await this.update(requestData);
    // const result = await app.mysql.delete(record_maintain_table, { id });
    return app.standardRes(
      200,
      result.affectedRows === 0 ? `error:id:${id}_not_found` : `success:delete_recordMaintain_${id}`
    );
  }
}

module.exports = CurrentService;
