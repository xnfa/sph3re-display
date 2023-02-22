import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import path from 'path';

import { Adapter } from '../../types/adapter.interface';

export class DarwinAdapter implements Adapter {
  driverBase: string;
  platform = 'darwin';
  command: ChildProcessWithoutNullStreams;

  constructor(driverBase: string) {
    this.driverBase = driverBase;
    this.command = spawn(
      `${path.resolve(this.driverBase, 'darwin/ScreenAdapter')}`
    );
    this.command.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
  }

  installDriver() {
    // ignore
  }

  add() {
    console.log('add start');
    this.command.stdin.write('1\n');
    console.log('add end');
  }

  async remove() {
    this.command.stdin.write('0\n');
  }
}
