'use strict';

const Service = require('egg').Service;
const table = 'akso_record_transport_t';

class CurrentService extends Service {
  async create(requestData) {
    const { app } = this;
    const dataWithDefault = app.addDefaultTime(requestData);
    const result = await app.mysql.insert(table, dataWithDefault);
    return app.standardRes(
      200,
      'success:create_recordTransport',
      { id: result.insertId }
    );
  }
}

module.exports = CurrentService;
