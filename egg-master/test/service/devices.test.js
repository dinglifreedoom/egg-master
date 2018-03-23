'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const resourece = 'devices';

describe('test/service/devices.test.js', () => {

  describe('index()', () => {

    it('should result exists', async () => {
      const opts = {
        where: { village_id: 1 },
      };
      const ctx = app.mockContext();
      const { code, result } = await ctx.service[resourece].index(opts)
        .catch(e => {
          console.log(e);
        });
      assert.strictEqual(code, 200);
      assert(result);
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

});
