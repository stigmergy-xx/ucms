#!/usr/bin/env node
/**
 * Created by tdzl2_000 on 2015-12-18.
 */
var fs = require('fs');
var path = require('path');

var plugins = [
  "syntax-object-rest-spread",
  "transform-es2015-arrow-functions",
  "transform-async-to-generator",
  "transform-es2015-modules-commonjs",
  "transform-es2015-destructuring",
  "transform-object-rest-spread",
  "transform-es2015-parameters"
];

require('babel-register')({
  plugins: plugins.map(function (plugin) {
    // Normalise plugin to an array.
    if (!Array.isArray(plugin)) {
      plugin = [plugin];
    }
    // Only resolve the plugin if it's a string reference.
    if (typeof plugin[0] === 'string') {
      plugin[0] = require(`babel-plugin-${plugin[0]}`);
      plugin[0] = plugin[0].__esModule ? plugin[0].default : plugin[0];
    }
    return plugin;
  }),
  //ignore: filename => {
  //  var dir = path.dirname(filename);
  //  for (;dir !== path.dirname(dir); dir = path.dirname(dir)) {
  //    if (path.basename(dir) === 'node_modules') {
  //      break;
  //    }
  //    if (fs.existsSync(path.join(dir, '.babelrc'))) {
  //      return false;
  //    }
  //  }
  //  return true;
  //},
});

require('../cli');
