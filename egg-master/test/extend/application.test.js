'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/extend/application.test.js', () => {

  describe('superType()', () => {
    const testFunction = 'superType';
    it('should object', () => {
      assert.strictEqual(app[testFunction]({}), 'object');
    });
    it('should array', () => {
      assert.strictEqual(app[testFunction]([]), 'array');
    });
    it('should set', () => {
      assert.strictEqual(app[testFunction](new Set()), 'set');
    });
    it('should map', () => {
      assert.strictEqual(app[testFunction](new Map()), 'map');
    });
    it('should null', () => {
      assert.strictEqual(app[testFunction](null), 'null');
    });
    it('should undefined', () => {
      assert.strictEqual(app[testFunction](), 'undefined');
    });
  });

  describe('serializeQuary()', () => {
    const testFunction = 'serializeQuary';
    it('should serialize query successful', () => {
      const url = 'http://api.finfosoft.com';
      const data = {
        access_token: '5a6851a54f46f1059cc2aa80',
        filter: {
          company_id: '5a586c6d584aee0007d04dff',
          customer_id: '5a586b8bb9e75314f088db65',
        },
      };
      assert.strictEqual(app[testFunction](url, data), `${url}?access_token=${data.access_token}&filter=${data.filter}`);
    });
  });

  describe('versioning()', () => {
    const testFunction = 'versioning';
    it('should add a version before target', () => {
      const target = '/session';
      assert.strictEqual(app[testFunction](target), '/v1/session');
    });
    it('should throw error when not starts with "/"', () => {
      const target = 'session';
      assert.throws(
        () => {
          app[testFunction](target);
        },
        Error
      );
    });
  });

  describe('standardRes()', () => {
    const testFunction = 'standardRes';
    it('should standard result', () => {
      const source = {
        a: 200,
        b: 'success',
        c: {
          d: 'abc',
        },
      };
      assert.deepEqual(app[testFunction](...Object.values(source)), {
        code: source.a,
        message: source.b,
        result: source.c,
      });
    });
    it('should return default result', () => {
      assert.deepEqual(app[testFunction](), {
        code: 200,
        message: '',
        result: {},
      });
    });
  });

  describe('getRandomIndex()', () => {
    const testFunction = 'getRandomIndex';
    it('should get random index of array', () => {
      const source = [];
      source.length = 10000;
      assert(app[testFunction](source) <= source.length);
      assert.notStrictEqual(app[testFunction](source), app[testFunction](source));
    });
  });

});
