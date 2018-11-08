'use strict';

const { Serlina } = require('serlina');

module.exports = app => {
  const config = app.config.serlina;
  app.config.coreMiddleware.push('serlinaRoute');
  app.beforeStart(async () => {
    const serlina = new Serlina(Object.assign({}, config));
    await serlina.prepare();
    app.serlina = serlina;
  });
};
