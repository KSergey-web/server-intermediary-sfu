import { IEquipment } from './equipment.interface';

export interface IConnectionStrapi {
  getEquipmentForConnect: (
    sessionId: number | string,
    jwt: string,
  ) => Promise<IEquipment>;
}
