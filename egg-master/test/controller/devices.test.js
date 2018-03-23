'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/controller/villages.test.js', () => {

  const baseUrl = '/devices';

  describe('index()', () => {

    it(`should GET ${baseUrl}`, async () => {
      const query = {
        where: { village_id: 1 },
      };
      return app.httpRequest()
        .get(app.versioning(baseUrl))
        .query(query)
        .expect(200)
        .expect(data => {
          const { body } = data;
          console.log(body);
          assert.strictEqual(body.code, 200);
          // assert.strictEqual(body.result.total, body.result.rows.length);
        });
    });

  });

  // describe('create()', () => {

  //   let id;
  //   after(async () => {
  //     await app.httpRequest()
  //       .delete(app.versioning(baseUrl) + '/' + id);
  //   });

  //   const requestData = {
  //     name: '照打转村',
  //     town: '局思镇',
  //     population: 853,
  //     households: 22,
  //     location: '114.638,37.27455',
  //     terrain: '五见村',
  //     principal: '白平',
  //     pub_user_id: '10004',
  //     phone: '13850466917',
  //     area: 898,
  //     status: 1,
  //   };

  //   it(`should POST ${baseUrl}`, async () => {
  //     const { body } = await app.httpRequest()
  //       .post(app.versioning(baseUrl))
  //       .send(requestData)
  //       .expect(200);
  //     assert.strictEqual(body.code, 200);
  //     assert(body.result.hasOwnProperty('id'));
  //     assert(body.result.hasOwnProperty('name'));
  //     id = body.result.id;
  //   });

  // });

});
