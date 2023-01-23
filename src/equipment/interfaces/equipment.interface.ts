import { IDeviceInfo } from './device-info.interface';

export interface IEquipment extends IDeviceInfo {
  name: string;
  stream_url: string;
  server_url: string;
  type: string;
}
