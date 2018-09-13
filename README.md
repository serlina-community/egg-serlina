# egg-serlina

[![NPM version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/serlina-community/egg-serlina/tree/master.svg?style=svg)](https://circleci.com/gh/serlina-community/egg-serlina/tree/master)
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-serlina.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-serlina
[download-image]: https://img.shields.io/npm/dm/egg-serlina.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-serlina

egg-serlina is a [Serlina](https://github.com/djyde/serlina) binding for Egg. It brings the best SSR solution to Egg application.

## Install

```bash
$ npm i egg-serlina react react-dom --save
```

## Usage

Enable the plugin:

```js
// {app_root}/config/plugin.js
exports.serlina = {
  enable: true,
  package: 'egg-serlina',
};
```

Add a `client` folder and create the first page:

```diff
- app_root
  - app
+ - client
+   - page
+     - page1.js
```

```js
// {app_root}/client/pages/page1.js

export default () => {
  return <div>Hello Serlina</div>
}
```

```js
// {app_root}/config/config.default.js

exports.serlina = {
  map: {
    '/page1': 'page1'
  }
}
```

Then visit `http://{your_host}/page1` and you will see the React page.

> Please note that the egg `ctx` had been injected to your page:

```js
// {app_root}/client/pages/page1.js

export default class Page1 extends React.Component {

  static async getInitialProps({ ctx }) {
    // ctx is egg `ctx`
    return {
      data: await ctx.service.getDate()
    }
  }

  render () {
    return (
      <div>{this.props.data}</div>
    )
  }
}
```

You can also render your page manually in controller:

```js
// app/controller/page1.js

module.exports = async ctx => {
  const rendered = await ctx.app.serlina.render('/page1', { ctx })
}
```

> Remember to inject your `ctx` if you need it in `getInitialProps`. 

## Configuration

### options

#### dev

**boolean** dev mode. 

default: `appInfo.env === 'local'`

#### baseDir

**string** Serlina baseDir.

default: `path.resolve(appInfo.baseDir, './client')`

#### outputPath

**string** Serlina output files path.

#### publicPath

**string** Webpack's publicPath. Only work in `prod` mode. Usually use it when you upload the Serlina output files to CDN.

default: `/public/`

### map

**object** Using Serlina only in specific path:

```js
exports.serlina = {
  map: {
    '/p/page1': 'page1' // render SSR page `page1` only when the `ctx.path` is `/p/page1`
  }
}
```

see [config/config.default.js](config/config.default.js) for more detail.

## Production deployment

### self serve static files

Before deploy to production, please run `serlina build` first (usually do it on CI):

```json
// ${app_root}/package.json

{
  "script": {
    "build": "serlina build ./client --publicPath /public/"
  }
}
```

Then you need to serve the output path:

```js
// {app_root}/config/config.default.js
exports.static = {
  dir: [
    path.join(appInfo.baseDir, 'app/public'),
    path.join(appInfo.baseDir, 'client/.serlina')
  ]
};
```

### server static files on CDN

```json
// ${app_root}/package.json

{
  "script": {
    "build": "serlina build ./client --publicPath ${YOUR_CDN_ENDPOINT}"
  }
}
```

```js
// {app_root}/config/config.default.js
exports.serlina = {
  publicPath: '${YOUR_CND_ENDPOINT}'
};
```

## Limitation

While Egg will restart a new worker after file changing, Serlina will restart building. Maybe it will be frustrating when the client code getting bigger. PR is welcome if you know how to deal with this problem.

## License

[MIT](LICENSE)
