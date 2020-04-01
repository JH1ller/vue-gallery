const generator = require('./src/scripts/createThumbs');

const ArbitraryCodeAfterReload = function (cb) {
  this.apply = function (compiler) {
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap('webpack-arbitrary-code', cb);
    }
  };
};

const callback = function () {
  console.log('Build callback');
  generator.run();
};

const plugins = [];
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  plugins.push(new ArbitraryCodeAfterReload(callback));
}


module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/index.scss";`
      }
    }
  },
  publicPath: './',
  configureWebpack: {
  }
};
