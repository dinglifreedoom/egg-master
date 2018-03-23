'use strict';

const router = app => {
  const { router, controller } = app;
  const filename = 'villages';
  const baseUrl = app.versioning('/' + filename);
  router.get(baseUrl, controller[filename].index);
  router.post(baseUrl, controller[filename].create);
  router.put(baseUrl, controller[filename].update);
  router.del(baseUrl + '/:id', controller[filename].delete);
};

module.exports = router;
