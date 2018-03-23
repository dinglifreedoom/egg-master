'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/controller/villages.test.js', () => {

  const baseUrl = '/villages';

  describe('index()', () => {

    it(`should GET ${baseUrl}`, async () => {
      return app.httpRequest()
        .get(app.versioning(baseUrl))
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 200);
          assert.strictEqual(body.result.total, body.result.rows.length);
        });
    });

  });

  describe('show()', () => {

    it(`should GET ${baseUrl}/:id`, async () => {
      // requestData.actk = app.config.actk;
      return app.httpRequest()
        .get(app.versioning(baseUrl) + '/1')
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 200);
          assert(body.result.hasOwnProperty('id'));
          assert(body.result.hasOwnProperty('name'));
        });
    });

  });

  describe('create()', () => {

    let id;
    after(async () => {
      await app.httpRequest()
        .delete(app.versioning(baseUrl) + '/' + id);
    });

    const requestData = {
      name: '照打转村',
      town: '局思镇',
      population: 853,
      households: 22,
      location: '114.638,37.27455',
      terrain: '五见村',
      principal: '白平',
      pub_user_id: '10004',
      phone: '13850466917',
      area: 898,
      status: 1,
    };

    it(`should POST ${baseUrl}`, async () => {
      const { body } = await app.httpRequest()
        .post(app.versioning(baseUrl))
        .send(requestData)
        .expect(200);
      assert.strictEqual(body.code, 200);
      assert(body.result.hasOwnProperty('id'));
      assert(body.result.hasOwnProperty('name'));
      id = body.result.id;
    });

  });

  describe('update()', () => {

    const requestData = {
      id: 5,
      name: '照打转村',
      town: '局思镇',
    };

    it(`should PUT ${baseUrl}`, async () => {
      return app.httpRequest()
        .put(app.versioning(baseUrl))
        .send(requestData)
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 200);
          assert.strictEqual(body.message, 'success:update_village_5');
        });
    });

  });

  describe('delete()', () => {

    let id;
    before(async () => {
      const requestData = {
        name: '照打转村',
        town: '局思镇',
        population: 853,
        households: 22,
        location: '114.638,37.27455',
        terrain: '五见村',
        principal: '白平',
        pub_user_id: '10004',
        phone: '13850466917',
        area: 898,
        status: 1,
      };
      const { body } = await app.httpRequest()
        .post(app.versioning(baseUrl))
        .send(requestData);
      id = body.result.id;
    });

    it(`should DELETE ${baseUrl}/:id`, async () => {
      return app.httpRequest()
        .delete(app.versioning(baseUrl) + '/' + id)
        .expect(200)
        .expect(data => {
          const { body } = data;
          assert.strictEqual(body.code, 200);
          assert.strictEqual(body.message, 'success:delete_village_' + id);
        });
    });

  });

});
