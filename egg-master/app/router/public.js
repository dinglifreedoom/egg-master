'use strict';

const router = app => {
  const { router, controller } = app;
  const filename = 'public';
  const baseUrl = app.versioning('/' + filename);
  router.post(baseUrl + '/login', controller[filename].login); // 登陆
  router.get(baseUrl + '/root', controller[filename].root); // 获取菜单
  router.get(baseUrl + '/user', controller[filename].user); // 获取公司用户
  router.put(baseUrl + '/password', controller[filename].password); // 修改密码
  router.get(baseUrl + '/weather', controller[filename].weather); // 天气
  router.get(baseUrl + '/device', controller[filename].device); // 设备信息
  router.get(baseUrl + '/dataConfig', controller[filename].dataConfig); // 端口信息
  router.post(baseUrl + '/forget', controller[filename].forget);
};

module.exports = router;
