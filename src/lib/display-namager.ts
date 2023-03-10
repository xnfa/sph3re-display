import { existsSync } from 'fs';
import path from 'path';

import { DarwinAdapter } from './adapters/darwin.adapter';
import { Win32Adapter } from './adapters/win32.adapter';

const adapters = [
  new Win32Adapter(getDriversBasePath()),
  new DarwinAdapter(getDriversBasePath()),
];

function getDriversBasePath() {
  if (existsSync(path.resolve(__dirname, '../../../drivers'))) {
    return path
      .resolve(__dirname, '../../../drivers')
      .replace('app.asar', 'app.asar.unpacked');
  } else {
    /** dev mode */
    return path.resolve(__dirname, '../../drivers');
  }
}

function getAdapter() {
  const adapter = adapters.filter((v) => v.platform === process.platform)[0];
  if (!adapter) {
    throw new Error('platform not supported');
  }
  return adapter;
}

export async function installDriver() {
  await getAdapter().installDriver();
}

export async function addScreen() {
  await getAdapter().add();
}

export async function removeScreen() {
  await getAdapter().remove();
}
