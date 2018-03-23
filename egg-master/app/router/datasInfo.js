'use strict';

const router = app => {
  const { router, controller } = app;
  const filename = 'datasInfo';
  const baseUrl = app.versioning('/' + filename);
  router.get(baseUrl, controller[filename].index);
  router.put(baseUrl, controller[filename].update);
};

module.exports = router;
