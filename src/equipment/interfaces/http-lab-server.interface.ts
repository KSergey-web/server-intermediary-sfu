import { IDeviceInfo } from './device-info.interface';
import { ILabServerOutput } from './lab-server-output.interface';

export interface IConnectionLabServer {
  sendCommand: (
    url_server: string,
    command: string,
    deviceInfo: IDeviceInfo,
  ) => Promise<ILabServerOutput>;
  sendFile: (
    url_server: string,
    command: string,
    file: Express.Multer.File,
    deviceInfo: IDeviceInfo,
  ) => Promise<ILabServerOutput>;
}
