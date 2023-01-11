export interface Adapter {
  platform: string;
  driverBase: string;
  installDriver(): Promise<void> | void;
  add(): Promise<void> | void;
  remove(): Promise<void> | void;
}
