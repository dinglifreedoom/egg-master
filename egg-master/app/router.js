'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/public')(app); // 公共接口集合
  require('./router/villages')(app); // 平台 -> 基础配置 -> 村庄配置 -> 编辑村庄信息
  require('./router/devices')(app); // 平台 -> 基础配置 -> 村庄配置 -> 绑定设备
  require('./router/datasInfo')(app); // 平台 -> 基础配置 -> 村庄配置 -> 编辑设备信息
  require('./router/recordsMaintain')(app); // 平台 -> 维修管理
  require('./router/recordsTransport')(app); // 污泥运输记录
  require('./router/rules')(app); // 平台 -> 告警管理 -> 告警配置
  require('./router/recordsAlarm')(app); // 平台 -> 告警管理 -> 告警信息
  require('./router/scadas')(app); // 平台 -> 基础配置 -> 村庄配置 -> 组态配置
};
