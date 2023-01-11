import path from 'path';

import { promisified as regedit } from 'regedit';

import { Adapter } from '../../types/adapter.interface';
import { execAsync } from '../../utils/execAsync';

export class Win32Adapter implements Adapter {
  driverBase: string;
  platform = 'win32';

  constructor(driverBase: string) {
    this.driverBase = driverBase;
  }

  async installDriver() {
    await execAsync(
      `${path.resolve(this.driverBase, 'usbmmidd_v2/install_driver.bat')}`
    );
    await regedit.deleteKey([
      'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
    ]);
    await regedit.createKey([
      'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
    ]);
    await regedit.putValue({
      'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors':
        {
          '0': {
            type: 'REG_SZ',
            value: '1920,1080',
          },
          '1': {
            type: 'REG_SZ',
            value: '1920,1200',
          },
          '2': {
            type: 'REG_SZ',
            value: '2560,1440',
          },
          '3': {
            type: 'REG_SZ',
            value: '3840,2160',
          },
          '': {
            type: 'REG_SZ',
            value: '1920,1080',
          },
        },
    });
  }

  async add() {
    await execAsync(
      `${path.resolve(this.driverBase, 'usbmmidd_v2/add_screen.bat')}`
    );
  }

  async remove() {
    await execAsync(
      `${path.resolve(this.driverBase, 'usbmmidd_v2/remove_screen.bat')}`
    );
  }
}
