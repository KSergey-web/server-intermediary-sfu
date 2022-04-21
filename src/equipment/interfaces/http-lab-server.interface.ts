import { ILabServerOutput } from './lab-server-output.interface';

export interface IConnectionLabServer {
  sendCommand: (
    url_server: string,
    command: string,
  ) => Promise<ILabServerOutput>;
  sendFile: (
    url_server: string,
    command: string,
    file: Express.Multer.File,
  ) => Promise<ILabServerOutput>;
}
