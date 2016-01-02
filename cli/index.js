/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import { parse } from 'cli-arguments';
import { startServer } from 'ucms-core';
import * as path from 'path';
import * as fs from 'fs';

function getOptions() {
  const config = require('./arguments.json');
  if (process.env.NODE_ENV === 'production') {
    config.defaultCommand = 'production';
  }

  const { options } = parse(config);
  return options;
}

const options = getOptions();

global.__OPTIONS__ = options;
global.__DEV__ = !options.production;

function doPiping() {
  if (__DEV__) {
    return require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i,
    });
  }
  return true;
}

async function loadPlugins() {
  const configPath = path.join(__dirname, '../config.json');
  if (!fs.existsSync(configPath)) {
    // TODO: Load installation plugins.
    console.log('No config.json found, enable installation plugin.');
    return;
  }
  const config = JSON.parse(fs.readFileSync(configPath));
  for (const pluginName in config) {
    if ({}.hasOwnProperty.call(config, pluginName)) {
      let func = require(pluginName);

      // Support ES6 export default with babel.
      if (typeof(func) === 'object' && typeof(func.default) === 'function') {
        func = func.default;
      }
      if (typeof(func) !== 'function') {
        continue;
      }
      const result = func(config[pluginName]);
      if (typeof(result) === 'object' && typeof(result.then) === 'function') {
        await result;
      }
    }
  }
}

if (doPiping()) {
  loadPlugins()
    .then(() => startServer(options.port, options.host))
    .catch(err => {
      console.error(err);
    });
}
