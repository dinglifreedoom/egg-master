'use strict';

const router = app => {
  const { router, controller } = app;
  const filename = 'scadas';
  const baseUrl = app.versioning('/' + filename);
  router.get(baseUrl, controller[filename].index);
  router.post(baseUrl, controller[filename].create);
};

module.exports = router;
