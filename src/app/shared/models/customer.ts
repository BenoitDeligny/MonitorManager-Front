import { User } from './user';
import { Monitor } from './monitor';

export class Customer {
  id?: number;
  customerName?: string;
  email?: string;
  address?: string;
  city?: string;
  department?: number;
  phone?: string;
  commercialId?: number;
  commercial?: User;
  monitors?: Monitor[];
}
