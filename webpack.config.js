const { composePlugins, withNx } = require('@nx/webpack');
const { IgnorePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => ({
  ...config,
  target: 'node',
  output: {
    ...config.output,
    libraryTarget: undefined,
    library: 'ds',
  },
  externals: {
    ssh2: 'require("ssh2")',
  },
  plugins: [
    ...config.plugins,
    new IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
  ],
  optimization: {
    ...config.optimization,
    // NEW
    checkWasmTypes: true,
    chunkIds: 'total-size',
    concatenateModules: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    moduleIds: 'size',
    nodeEnv: 'production',
    providedExports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    sideEffects: true,
    splitChunks: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        // `terserOptions` options will be passed to `uglify-js`
        // Link to options - https://github.com/mishoo/UglifyJS#minify-options
        terserOptions: {
          keep_fnames: false,
        },
      }),
    ],
  },
}));
