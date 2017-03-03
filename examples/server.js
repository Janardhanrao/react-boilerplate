// var config = require('./webpack.config.js');
// var webpack = require('webpack');
// var webpackDevServer = require('webpack-dev-server');
// var debug = require('debug');
// var compiler;
// var server;
// debug("In server ", config);


const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true,
  },
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});
// Source maps
// config.devtool = 'eval';
//
// config.output.publicPath = '/dist/';
//
// // Remove minification to speed things up.
// config.plugins.splice(1, 2);
//
// // Add Hot Loader server entry points.
// config.entry.app.unshift(
//     'webpack-dev-server/client?http://localhost:8081',
//     'webpack/hot/dev-server'
// );
//
// // Add HMR plugin
// config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
//
// // Add React Hot loader
// config.module.loaders[0].loaders.unshift('react-hot');
//
// debug("In server ", config);
// compiler = webpack(config);
// server = new webpackDevServer(compiler, {
//     publicPath: config.output.publicPath,
//     hot: true
// });
// server.listen(8082);
