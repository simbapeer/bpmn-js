const LodashPlugin = require('lodash-webpack-plugin');
const ExternalsHelperPlugin = require('webpack-babel-external-helpers-2');

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'bpmn-viewer': [ './lib/Viewer.js' ],
    'bpmn-viewer.min': [ './lib/Viewer.js' ],
    'bpmn-navigated-viewer': [ './lib/NavigatedViewer.js' ],
    'bpmn-navigated-viewer.min': [ './lib/NavigatedViewer.js' ],
    'bpmn-modeler': [ './lib/Modeler.js' ],
    'bpmn-modeler.min': [ './lib/Modeler.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [ 'env', {
              loose: true,
              modules: false,
              targets: {
                browsers: [
                  'last 2 major versions',
                  'not IE < 11',
                  'not IE_mob < 11'
                ]
              }
            } ]
          ],
          plugins: [
            'lodash',
            'external-helpers'
          ]
        }
      }
    ],
    noParse: /sax/
  },
  node: {
    global: true
  },
  output: {
    path: path.resolve(__dirname, '../bower-bpmn-js/dist'),
    filename: '[name].js',
    library: 'BpmnJS',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      'lodash-es': 'lodash'
    }
  },
  plugins: [
    new ExternalsHelperPlugin({
      whitelist: [
        'classCallCheck',
        'inherits',
        'typeof',
        'possibleConstructorReturn'
      ]
    }),
    new LodashPlugin({ collections: true }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      parallel: true
    })
  ],
  devtool: 'source-map'
};
