'use strict';

const router = app => {
  const { router, controller } = app;
  const filename = 'recordsTransport';
  const baseUrl = app.versioning('/' + filename);
  router.post(baseUrl, controller[filename].create);
};

module.exports = router;
