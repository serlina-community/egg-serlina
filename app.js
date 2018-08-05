'use strict';

const { Serlina } = require('serlina');

module.exports = app => {
  const config = app.config.serlina;
  app.config.coreMiddleware.push('serlinaRoute');
  app.beforeStart(async () => {
    const serlina = new Serlina(Object.assign({}, {
      dev: config.dev,
      baseDir: config.baseDir,
      outputPath: config.outputPath,
      publicPath: config.publicPath,
    }));
    await serlina.prepare();
    app.serlina = serlina;
  });
};
