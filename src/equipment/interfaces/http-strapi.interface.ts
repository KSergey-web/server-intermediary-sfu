import { IEquipment } from './equipment.interface';
import { IUser } from './user.interface';

export interface IConnectionStrapi {
  whoAmI: (jwt: string) => Promise<IUser>;
  canAccessToSession: (
    sessionId: number | string,
    jwt: string,
  ) => Promise<IEquipment>;
}
