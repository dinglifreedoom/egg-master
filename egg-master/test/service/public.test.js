'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/service/public.test.js', () => {

  describe('login()', () => {

    const requestData = {
      username: '999@qq.com',
      password: '555555',
    };

    it('should result exists', async () => {
      const ctx = app.mockContext();
      const { code, result } = await ctx.service.public.login(requestData)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
      assert(result.hasOwnProperty('fullname'));
      assert(result.hasOwnProperty('city_id'));
      assert(result.hasOwnProperty('company_location'));
      assert(result.hasOwnProperty('menus'));
      assert(result.hasOwnProperty('company_id'));
      assert(result.hasOwnProperty('customer_id'));
      assert(result.hasOwnProperty('access_token'));
      app.config.actk = result.access_token;
    });

  });

  // describe('root()', () => {

  //   const requestData = {};
  //   it('should result exists', async () => {
  //     const ctx = app.mockContext();
  //     requestData.access_token = app.config.actk;
  //     const { code, result } = await ctx.service.public.root(requestData);
  //     assert.strictEqual(code, 200);
  //     assert(result);
  //     assert.strictEqual(result.total, result.rows.length);
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('menu_name'));
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('menu_url'));
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('index'));
  //   });

  //   it('should order menu list with index', async () => {
  //     const ctx = app.mockContext();
  //     requestData.access_token = app.config.actk;
  //     const { result } = await ctx.service.public.root(requestData);
  //     const startIndex = Math.round(Math.random() * (result.total - 2));
  //     const endIndex = startIndex + Math.round(Math.random() * (result.total - 2 - startIndex)) + 1;
  //     assert(result.rows[startIndex].index < result.rows[endIndex].index, true);
  //   });

  // });

  // describe('user()', () => {

  //   const requestData = {
  //     filter: {
  //       company_id: '5a586c6d584aee0007d04dff',
  //       customer_id: '5a586b8bb9e75314f088db65',
  //     },
  //   };
  //   it('should result exists', async () => {
  //     const ctx = app.mockContext();
  //     requestData.access_token = app.config.actk;
  //     const { code, result } = await ctx.service.public.user(requestData);
  //     assert.strictEqual(code, 200);
  //     assert(result);
  //     assert.strictEqual(result.total, result.rows.length);
  //     assert.strictEqual(result.total, result.rows.length);
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('_id'));
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('fullname'));
  //   });

  // });

  // describe('weather()', () => {

  //   const requestData = {
  //     city_id: '310',
  //   };

  //   it('should result exists', async () => {
  //     const ctx = app.mockContext();
  //     const { code, result } = await ctx.service.public.weather(requestData);
  //     assert.strictEqual(code, 200);
  //     assert(result);
  //     assert(result.hasOwnProperty('weather'));
  //     assert(result.hasOwnProperty('img'));
  //     assert(result.hasOwnProperty('templow'));
  //     assert(result.hasOwnProperty('temphigh'));
  //   });

  // });

  // describe('device()', () => {

  //   const requestData = {
  //     device_kind: '1,2,3,4',
  //     filter: {
  //       customer_id: '5a586b8bb9e75314f088db65',
  //     },
  //   };
  //   it('should result exists', async () => {
  //     const ctx = app.mockContext();
  //     requestData.access_token = app.config.actk;
  //     const { code, result } = await ctx.service.public.device(requestData);
  //     assert.strictEqual(code, 200);
  //     assert(result);
  //     assert.strictEqual(result.total, result.rows.length);
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('pub_device_id'));
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('pub_device_name'));
  //     assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('pub_device_kind'));
  //   });

  // });

  describe('deviceData()', () => {

    const device_id = '59a289adf16dcc00052cb03e';
    const requestData = {
      value_flag: false,
      filter: { device_id },
    };
    it('should result exists', async () => {
      const ctx = app.mockContext();
      requestData.access_token = app.config.actk;
      const { code, result } = await ctx.service.public.deviceData(device_id, requestData);
      assert.strictEqual(code, 200);
      assert(result);
      // assert.strictEqual(result.total, result.rows.length);
      // assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('pub_device_id'));
      // assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('pub_device_name'));
      // assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('pub_device_kind'));
    });

  });

});
