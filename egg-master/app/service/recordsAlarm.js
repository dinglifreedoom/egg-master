'use strict';

const Service = require('egg').Service;
const record_alarm_table = 'akso_record_alarm_t';

class CurrentService extends Service {
  async index(requestData) {
    const { app, ctx } = this;
    const { opts, access_token } = requestData;
    const { where, columns } = opts;
    const { pub_company_id } = where;
    let result = await app.mysql.select(record_alarm_table, { where, columns });
    for (const alarm of result) {
      const { village_id, pub_data_id } = alarm;
      // 查询村庄名称
      const { result: { rows: villages } } = await ctx.service.villages.index({
        where: { id: village_id },
        columns: [ 'name', 'pub_user_id' ],
      });
      alarm.village_name = villages[0].name;
      // 查询用户名
      const { result: { rows: users } } = await ctx.service.public.user({
        access_token,
        filter: { company_id: pub_company_id },
        opts: { where: { pub_user_id: villages[0].pub_user_id } },
      });
      alarm.fullname = users[0].fullname;
      // 查询数据名称
      const { result: { rows: datasInfo } } = await ctx.service.datasInfo.index({
        where: { pub_data_id },
        columns: [ 'pub_data_name' ],
      });
      alarm.pub_data_name = datasInfo[0].pub_data_name;
    }
    result = app.likeFormater(result, opts.like, 'village_name');
    result = app.pagingFormater(result, opts.limit, opts.offset);
    return app.standardRes(
      200,
      'success:get_recordsAlarm',
      result
    );
  }
  async update(requestData) {
    const { app } = this;
    const type = app.superType(requestData);
    if (type === 'object') {
      requestData = app.addUpdateTime(requestData);
      const result = await app.mysql.update(record_alarm_table, requestData);
      return app.standardRes(
        200,
        result.affectedRows === 0 ? `error:id:${requestData.id}_not_found` : `success:update_recordAlarm_${requestData.id}`
      );
    } else if (type === 'array') {
      const result = await Promise.all(requestData.map(single => {
        return app.mysql.update(record_alarm_table, single);
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
        isError ? 'error:update_failed' : 'success:update_recordsAlarm'
      );
    }
  }
}

module.exports = CurrentService;
