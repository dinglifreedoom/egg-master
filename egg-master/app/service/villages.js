'use strict';

const Service = require('egg').Service;
const village_table = 'akso_village_t';

class CurrentService extends Service {
  async index(opts = {}) {
    const { app } = this;
    const { where, columns } = opts;
    let result = await app.mysql.select(village_table, { where, columns });
    result = app.likeFormater(result, opts.like, 'name');
    result = app.pagingFormater(result, opts.limit, opts.offset);
    return app.standardRes(
      200,
      'success:get_villages',
      result
    );
  }
  async create(requestData) {
    const { app } = this;
    const dataWithDefault = app.addDefaultTime(requestData);
    const result = await app.mysql.insert(village_table, dataWithDefault);
    return app.standardRes(
      200,
      'success:create_village',
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
      const result = await app.mysql.update(village_table, requestData);
      return app.standardRes(
        200,
        result.affectedRows === 0 ? `error:id:${requestData.id}_not_found` : `success:update_village_${requestData.id}`
      );
    } else if (type === 'array') {
      const result = await Promise.all(requestData.map(single => {
        return app.mysql.update(village_table, single);
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
        isError ? 'error:update_failed' : 'success:update_villages'
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
    return app.standardRes(
      200,
      result.affectedRows === 0 ? `error:id:${id}_not_found` : `success:delete_village_${id}`
    );
  }
  async available(opts = {}) {
    const { app } = this;
    Object.assign(opts, { where: { available: true } });
    const result = await app.mysql.select(village_table, opts);
    return result;
  }
}

module.exports = CurrentService;
