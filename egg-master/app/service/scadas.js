'use strict';

const Service = require('egg').Service;
const scada_table = 'akso_scada_t';

class CurrentService extends Service {
  async index(opts = {}) {
    const { app } = this;
    const { where, columns } = opts;
    const result = await app.mysql.select(scada_table, { where, columns });
    return app.standardRes(
      200,
      'success:get_scadas',
      result
    );
  }
  async create(requestData) {
    const { app } = this;
    const dataWithDefault = app.addDefaultTime(requestData);
    const result = await app.mysql.insert(scada_table, dataWithDefault);
    return app.standardRes(
      200,
      'success:create_scadas',
      {
        id: result.insertId,
        name: requestData.name,
      }
    );
  }
}

module.exports = CurrentService;
