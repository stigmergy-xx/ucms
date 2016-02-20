/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import {
  startServer,
  addFilter,
  PLUGINS,
  SESSION,
} from 'ucms-core';
import * as path from 'path';
import * as fs from 'fs';

global.__DEV__ = process.env.NODE_ENV !== 'production';

function doPiping() {
  if (__DEV__) {
    return require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i,
    });
  }
  return true;
}

function loadPluginConfig() {
  const configPath = process.env.UCMS_CONFIG || path.join(__dirname, '../config.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  }
}

async function loadToken(ctx) {
  return ctx.header['x-accesstoken'];
}

async function main() {
  const port = (process.env.UCMS_API_PORT | 0) || 8901;
  const host = process.env.UCMS_API_HOST || (__DEV__ ? 'localhost' : undefined);

  addFilter(PLUGINS.LOAD_CONFIG, loadPluginConfig);
  addFilter(SESSION.LOAD_TOKEN, loadToken);
  await startServer(port, host);
}


if (doPiping()) {
  main()
    .catch(err => {
      console.error(err.stack);
      setTimeout(() => {throw err;});
    });
}
