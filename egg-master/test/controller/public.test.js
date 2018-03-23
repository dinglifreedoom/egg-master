'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/controller/public.test.js', () => {

  describe('login()', () => {

    const url = '/public/login';

    it('should POST /public/login', async () => {
      const requestData = {
        username: '999@qq.com',
        password: '555555',
      };
      return app.httpRequest()
        .post(app.versioning(url))
        .send(requestData)
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 200);
          assert(body.result.hasOwnProperty('access_token'));
          assert(body.result.hasOwnProperty('menus'));
          assert(body.result.hasOwnProperty('city_id'));
          assert(body.result.hasOwnProperty('customer_id'));
          assert(body.result.hasOwnProperty('company_id'));
          app.config.actk = body.result.access_token;
        });
    });

    it('should failed when send wrong username or password', async () => {
      const requestData = {
        username: '999@qq.com',
        password: '123456',
      };
      return app.httpRequest()
        .post(app.versioning(url))
        .send(requestData)
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 400001);
        });
    });

  });

  // describe('root()', () => {

  //   const requestData = {};
  //   const url = '/public/root';

  //   it('should GET /public/root', async () => {
  //     requestData.actk = app.config.actk;
  //     return app.httpRequest()
  //       .get(app.versioning(url))
  //       .set(requestData)
  //       .expect(200)
  //       .expect(data => {
  //         const { body } = data;
  //         assert.strictEqual(body.code, 200);
  //         assert.strictEqual(body.result.total, body.result.rows.length);
  //       });
  //   });

  // });

  // describe('user()', () => {

  //   const requestData = {};
  //   const query = {
  //     company_id: '5a586c6d584aee0007d04dff',
  //     customer_id: '5a586b8bb9e75314f088db65',
  //   };
  //   const url = '/public/user';

  //   it('should GET /public/user', async () => {
  //     requestData.actk = app.config.actk;
  //     return app.httpRequest()
  //       .get(app.versioning(url))
  //       .set(requestData)
  //       .query(query)
  //       .expect(200)
  //       .expect(data => {
  //         const { body } = data;
  //         assert.strictEqual(body.code, 200);
  //         assert.strictEqual(body.result.total, body.result.rows.length);
  //       });
  //   });

  // });

  // describe('weather()', () => {

  //   const query = {
  //     city_id: '310',
  //   };
  //   const url = '/public/weather';

  //   it('should GET /public/weather', async () => {
  //     return app.httpRequest()
  //       .get(app.versioning(url))
  //       .query(query)
  //       .expect(200)
  //       .expect(data => {
  //         const { body } = data;
  //         assert.strictEqual(body.code, 200);
  //         assert(body.result.hasOwnProperty('weather'));
  //         assert(body.result.hasOwnProperty('img'));
  //         assert(body.result.hasOwnProperty('templow'));
  //         assert(body.result.hasOwnProperty('temphigh'));
  //       });
  //   });

  // });

  describe('device()', () => {

    const requestData = {};
    const query = {
      device_kind: '1,2,3,4',
      customer_id: '5a586b8bb9e75314f088db65',
    };
    const url = '/public/device';

    it('should GET /public/device', async () => {
      requestData.actk = app.config.actk;
      return app.httpRequest()
        .get(app.versioning(url))
        .set(requestData)
        .query(query)
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 200);
          assert.strictEqual(body.result.total, body.result.rows.length);
        });
    });

  });

});
