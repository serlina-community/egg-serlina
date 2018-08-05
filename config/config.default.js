'use strict';

/**
 * egg-serlina default config
 * @member Config#serlina
 * @property {String} SOME_KEY - some description
 */

const path = require('path');

module.exports = appInfo => {

  const config = {};

  config.serlina = {
    dev: appInfo.env === 'local',
    baseDir: path.resolve(appInfo.baseDir, './client'),
    publicPath: '/public/',
  };

  return config;
};
