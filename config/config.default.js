'use strict';

/**
 * egg-serlina default config
 * @member Config#serlina
 * @property {String} SOME_KEY - some description
 */

const path = require('path');

exports.serlina = appInfo => {
  return {
    dev: appInfo.env === 'local',
    baseDir: path.resolve(appInfo.baseDir, './client'),
    publicPath: '/public/',
  };
};
