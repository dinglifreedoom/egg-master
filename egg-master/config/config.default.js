'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1516253211332_1451';

  // add your config here
  config.middleware = [];

  // external api server list
  config.serverList = {
    // devValidate: 'http://192.168.1.105:8085',
    devValidate: 'http://121.42.253.149:18866',
    // tempValidate: 'http://192.168.1.105:8085',
    // devManager: 'http://192.168.1.108:8088',
    devManager: 'http://121.42.253.149:18825',
    ofcManager: 'http://114.215.46.56:18825',
  };

  // login client
  config.client = {
    client_id: 'water',
    client_secret: 'water',
  };

  // domain whitelist
  config.security = {
    csrf: {
      enable: false,
    },
    // domainWhiteList: [
    //   '192.168.1.*',
    //   '127.0.0.*',
    // ],
  };

  // cross origin
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // config.mysql = {
  //   client: {
  //     host: 'localhost',
  //     port: '3306',
  //     user: 'finfosoft_akso_manager',
  //     password: 'finfosoft123',
  //     database: 'finfosoft_akso_dev',
  //   },
  //   app: true,
  //   agent: false,
  // };
  config.mysql = {
    client: {
      host: '121.42.253.149',
      port: '63306',
      user: 'akso_user',
      password: 'finfosoft123',
      database: 'finfosoft-akso',
    },
    app: true,
    agent: false,
  };

  // use version in package.json
  config.version = appInfo.pkg.version;

  // test access_token
  // http://192.168.1.108:8085/authorize/authorize?client_secret=water&client_id=water&username=999@qq.com&password=555555
  config.actk = '';

  // fake data for temporary using
  config.customData = {};

  return config;
};
