'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/service/villages.test.js', () => {

  describe('index()', () => {

    it('should result exists', async () => {
      const ctx = app.mockContext();
      const { code, result } = await ctx.service.villages.index()
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
      assert.strictEqual(result.total, result.rows.length);
      assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('id'));
      assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('location'));
    });

    it('should result exists when use opts', async () => {
      const opts = {
        columns: [ 'id', 'name', 'town' ],
        orders: [[ 'id', 'desc' ]],
        limit: 1,
        offset: 1,
      };
      const ctx = app.mockContext();
      const { code, result } = await ctx.service.villages.index(opts)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
      assert.strictEqual(result.total, result.rows.length);
      assert.strictEqual(result.total, 1);
      assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('id'));
      assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('name'));
      assert(result.rows[app.getRandomIndex(result.rows)].hasOwnProperty('town'));
    });

  });

  describe('show()', () => {

    it('should result exists', async () => {
      const requestData = 1;
      const ctx = app.mockContext();
      const { code, result } = await ctx.service.villages.show(requestData)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
      assert.strictEqual(result.id, requestData);
      assert(result.hasOwnProperty('pub_user_id'));
    });

  });

  describe('create()', () => {

    let id;
    after(async () => {
      const ctx = app.mockContext();
      await ctx.service.villages.delete(id);
    });

    it('should create a village', async () => {
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
      const ctx = app.mockContext();
      const { code, result } = await ctx.service.villages.create(requestData)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
      assert(result.hasOwnProperty('id'));
      assert(result.hasOwnProperty('name'));
      id = result.id;
    });

  });

  describe('update()', () => {

    it('should update a village', async () => {
      const requestData = [
        {
          id: 1,
          name: '阿布书村',
          town: '海被镇',
          population: 932,
          households: 78,
        },
        {
          id: 2,
          name: '成都书村',
          town: '海被镇',
          population: 932,
          households: 78,
        },
      ];
      const ctx = app.mockContext();
      const { code, result } = await ctx.service.villages.update(requestData)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
    });

    it('should error when update datas are not found', async () => {
      const requestData = [
        {
          id: 5,
          name: '阿布书村',
          town: '海被镇',
          population: 932,
          households: 78,
        },
        {
          id: 8,
          name: '成都书村',
          town: '海被镇',
          population: 932,
          households: 78,
        },
      ];
      const ctx = app.mockContext();
      const { code, message } = await ctx.service.villages.update(requestData)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert.strictEqual(message, 'error:update_failed');
    });

    it('should error when update data is not found', async () => {
      const requestData = {
        id: 3,
        name: '成都书村',
        town: '海被镇',
        population: 932,
        households: 78,
      };
      const ctx = app.mockContext();
      const { code, message } = await ctx.service.villages.update(requestData)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert.strictEqual(message, 'error:id:3_not_found');
    });

  });

  describe('delete()', () => {

    let id;
    before(async () => {
      const ctx = app.mockContext();
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
      const { result } = await ctx.service.villages.create(requestData);
      id = result.id;
    });

    it('should delete a village', async () => {
      const ctx = app.mockContext();
      const { code, message } = await ctx.service.villages.delete(id)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(message.startsWith('success'));
    });

    it('should error when id is not found', async () => {
      const id = 100000;
      const ctx = app.mockContext();
      const { code, message } = await ctx.service.villages.delete(id)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(message.startsWith('error'));
    });

  });

});
