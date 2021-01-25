import { Role } from './role';

export class User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  alias?: string;
  password?: string;
  role?: Role;
  customers?: any[];
}
