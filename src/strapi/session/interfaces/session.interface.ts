export interface ISession {
  id?: number;
  user: number;
  creator: number;
  equipment: number;
  begin: string;
  end: string;
  booking?: number | null;
}
