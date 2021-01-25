import { Customer } from './customer';
import { MonitorVersion } from './monitor-version';
import { SoftwareVersion } from './software-version';

export class Monitor {
  id?: number;
  reference?: number;
  deliveryDate?: Date;
  startingDate?: Date;
  exchangeDate?: Date;
  disposal?: string;
  monitorVersion?: MonitorVersion;
  softwareVersion?: SoftwareVersion;
  owner?: Customer;
}
