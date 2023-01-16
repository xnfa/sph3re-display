import path from 'path';

import q from 'qiao-regedit';

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
    await q.delValueSync({
      key: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
      name: '0',
    });
    await q.delValueSync({
      key: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
      name: '1',
    });
    await q.delValueSync({
      key: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
      name: '2',
    });
    await q.delValueSync({
      key: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
      name: '3',
    });
    await q.delValueSync({
      key: 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\WUDF\\Services\\usbmmIdd\\Parameters\\Monitors',
      name: '4',
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
