import path from 'path'
import {DefinePlugin} from 'webpack'

const CONTEXT = path.resolve(__dirname),
      {NODE_ENV} = process.env

var createPath = function(nPath) {
  return path.resolve(CONTEXT, nPath)
}

var config = {
  context: CONTEXT,
  entry: './src/index.ts',

  output: {
    path: createPath('dist'),
    library: 'angular2-api',
    libraryTarget: 'umd',
    filename: 'angular2-api.js'
  },

  plugins: [
    new DefinePlugin({
      __DEV__: NODE_ENV === 'development' || NODE_ENV === 'test'
    })
  ],

  module: {
    loaders: [{
      test: /\.ts/,
      loader: 'babel!ts',
      include: [createPath('src'), createPath('test')],
      exclude: [createPath('node_modules')]
    }]
  },

  externals: [
    '@angular/core',
    '@angular/http',
    'rxjs/add/operator/map',
    'rxjs/add/operator/mergeMap',
    'rxjs/add/operator/catch',
    'rxjs/add/observable/throw',
    'rxjs/Observable',
    'rxjs/observable'
  ],

  resolve: {
    extensions: ['.ts', '.js','']
  }
}

module.exports = config
