/**
 * Created by tdzl2_000 on 2015-12-18.
 */
"use strict";

const fs = require('fs');
const path = require('path');

require('babel-register')({
  ignore: filename => {
    let dir = path.dirname(filename);
    for (;dir !== path.dirname(dir); dir = path.dirname(dir)) {
      if (path.basename(dir) === 'node_modules') {
        break;
      }
      if (fs.existsSync(path.join(dir, '.babelrc'))) {
        return false;
      }
    }
    return true;
  },
});

require('../cli');
