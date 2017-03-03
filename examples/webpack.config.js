const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: __dirname,
  entry: [

    './app/index.js',
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
      '../node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
       // Preprocess 3rd party .css files located in node_modules
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ExtractTextPlugin.extract({ use: ['css-loader', 'less-loader'], fallback: 'style-loader' }),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'AE React Commons ',
      template: './index.ejs',
    }),
    new ExtractTextPlugin('[name].css'),
  ],
};

// module.exports = {
//     debug: true,
//     entry: {
//         app: [
//             './src/index.js'
//         ]
//     },
//     target: 'web',
//     // Resolves are needed as we require a file that is
//     // in a parent directory and webpack can't find node_modules
//     // when we do this.
//     resolveLoader: {
//         root: path.join(__dirname, './node_modules')
//     },
//     resolve: {
//         root: path.join(__dirname, './node_modules')
//     },
//     output: {
//         publicPath: './dist/',
//         path: path.join(__dirname, './dist'),
//         filename: 'app.js',
//         chunkFilename: '[id].js'
//     },
//     module: {
//         // Babel loader must be first as it's modified by server.js
//         loaders: [{
//             test: /\.js$/,
//             // Must be an array as server.js adds 'react-hot' loader
//             loaders: ['babel?optional=runtime'],
//             exclude: /node_modules/
//         }, {
//             test: /\.css$/,
//             loader: 'style-loader!css-loader'
//         }, {
//             test: /\.(svg|woff|ttf|eot|png|jpg|gif)(\?.*)?$/i,
//             loader: 'url-loader?limit=10000'
//         }]
//     },
//     plugins: [
//         // First two plugins are removed by server.js
//         new webpack.optimize.UglifyJsPlugin({
//             minimize: true,
//             output: {
//                 comments: false
//             }
//         }),
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         })
//     ]
// };
