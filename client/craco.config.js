module.exports = {
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      webpackConfig['resolve'] = {
        fallback: {
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
          stream: require.resolve("stream-browserify"),
          zlib: require.resolve('browserify-zlib'),
        },
        alias: {
          zlib: require.resolve('browserify-zlib')
        },
      }
      return webpackConfig;
    },
  },
};