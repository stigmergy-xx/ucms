#!/usr/bin/env node
/**
 * Created by tdzl2_000 on 2015-12-18.
 */

if (process.env.NODE_ENV === 'production'){
  require('../lib/cli');
} else {
  var fs = require('fs');
  var path = require('path');

  require('babel-register')({
    ignore: filename => {
      var dir = path.dirname(filename);
      for (; dir !== path.dirname(dir); dir = path.dirname(dir)) {
        if (path.basename(dir) === 'node_modules' || path.basename(dir) === 'lib') {
          break;
        }
        if (fs.existsSync(path.join(dir, '.babelrc'))) {
          return false;
        }
      }
      return true;
    },
  });

  require('../src/cli');
}
