'use strict';

const mock = require('egg-mock');
const assert = require('power-assert');

describe('test/serlina.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/serlina-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET normal page', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, serlina')
      .expect(200);
  });

  it('should GET SSR page', () => {
    return app.httpRequest()
      .get('/page1')
      .expect(res => {
        assert(res.text.startsWith('<!DOCTYPE html>'));
      })
      .expect(200);
  });
});
