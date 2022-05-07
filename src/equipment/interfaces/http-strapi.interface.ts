import { IEquipment } from './equipment.interface';
import { IUser } from './user.interface';

export interface IConnectionStrapi {
  whoAmI: (jwt: string) => Promise<IUser>;
  getEquipmentForConnect: (
    sessionId: number | string,
    jwt: string,
  ) => Promise<IEquipment>;
}
