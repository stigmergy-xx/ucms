/**
 * Created by tdzl2_000 on 2015-12-18.
 */

import { startServer, addFilter, PLUGINS } from 'ucms-core';
import * as path from 'path';
import * as fs from 'fs';
import assert from 'assert';

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
  const configPath = path.join(__dirname, '../config.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  }
}

async function main(){
  const port = (process.env.UCMS_API_PORT | 0) || 8901;
  const host = (process.env.UCMS_API_HOST | 0) || (__DEV__ ? 'localhost' : undefined);

  addFilter(PLUGINS.LOAD_CONFIG, loadPluginConfig);
  await startServer(port, host);
}


if (doPiping()) {
  main()
    .catch(err => {
      setTimeout(()=>{throw err;});
    });
}
