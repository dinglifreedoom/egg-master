'use strict';

const Service = require('egg').Service;
const data_config_table = 'akso_data_config_t';
const data_info_table = 'akso_data_info_t';

class CurrentService extends Service {
  async index(requestData) {
    const { app } = this;
    const { where, columns } = requestData;
    const { status = [ 0, 1, 2 ] } = where;
    delete where.status;
    let result = await app.mysql.select(data_config_table, { where });
    for (const item of result) {
      const res = await app.mysql.select(data_info_table, {
        where: { pub_data_id: item.pub_data_id },
      });
      Object.assign(item, res[0]);
    }
    // if (status) {
    result = app.whereFormater(result, { status });
    // }
    result = app.columnsFormater(result, columns);
    return app.standardRes(
      200,
      'success:get_datasInfo',
      result
    );
  }
  async update(requestData) {
    const { app } = this;
    await Promise.all(requestData.map(item => {
      const { id, supplier, user, phone } = item;
      return app.mysql.update(data_info_table, { id, supplier, user, phone });
    }));
    return app.standardRes(
      200,
      'success:update_datasInfo'
    );
  }
}

module.exports = CurrentService;
