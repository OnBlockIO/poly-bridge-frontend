const WebpackCdnPlugin = require('webpack-cdn-plugin');
const webpack = require('webpack');

const IN_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  devServer: { https: false },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  chainWebpack: (config) => {
    config.devtool(!IN_PRODUCTION ? 'source-map' : false);

    /* if (IN_PRODUCTION) {
      config.plugin('cdn').use(WebpackCdnPlugin, [
        {
          modules: [
            { name: 'vue', var: 'Vue', path: 'dist/vue.runtime.min.js' },
            { name: 'vue-router', var: 'VueRouter', path: 'dist/vue-router.min.js' },
            { name: 'vuex', var: 'Vuex', path: 'dist/vuex.min.js' },
            { name: 'element-ui', var: 'ELEMENT', path: 'lib/index.js' },
          ],
          prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path',
          publicPath: process.env.VUE_APP_PUBLIC_PATH,
        },
      ]);
    } */
  },
  configureWebpack: (config) => {
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      assert: require.resolve('assert'),
      url: require.resolve('url'),
    };

    const bufferPlugin = new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] });
    const processPlugin = new webpack.ProvidePlugin({ process: 'process/browser' });
    const osPlugin = new webpack.ProvidePlugin({ os: 'os-browserify/browser' });

    const streamPlugin = new webpack.ProvidePlugin({ stream: 'stream-browserify' });

    const streamTransform = new webpack.ProvidePlugin({
      _stream_transform: 'readable-stream/transform',
    });
    const streamDuplex = new webpack.ProvidePlugin({ _stream_duplex: 'readable-stream/duplex' });
    const streamPassthrough = new webpack.ProvidePlugin({
      _stream_passthrough: 'readable-stream/passthrough',
    });
    const streamReadable = new webpack.ProvidePlugin({
      _stream_readable: 'readable-stream/readable',
    });
    const streamWritable = new webpack.ProvidePlugin({
      _stream_writable: 'readable-stream/writable',
    });

    config.plugins.push(
      ...[
        bufferPlugin,
        processPlugin,
        osPlugin,
        streamPlugin,
        streamTransform,
        streamDuplex,
        streamPassthrough,
        streamReadable,
        streamWritable,
      ],
    );
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/styles/variables/index.scss';
          @import '@/styles/mixins/index.scss';
        `,
      },
    },
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
};
