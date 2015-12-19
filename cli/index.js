/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import config from './arguments.json';
import { parse } from 'cli-arguments';
import { startServer } from 'ucms-core';

if (process.env.NODE_ENV === 'production') {
  config.defaultCommand = 'production';
}

const { options } = parse(config);

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

if (doPiping()) {
  process.on('exit', () => {
    console.log('Bye.');
  });
  startServer(options)
    .catch(err => {
      console.error(err);
    });
}
