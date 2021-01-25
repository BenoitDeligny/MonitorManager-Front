import { User } from './user';
import { Monitor } from './monitor';

export class Customer {
  id?: number;
  customerName?: string;
  address?: string;
  department?: number;
  commercial?: User;
  monitors?: Monitor[];
}
