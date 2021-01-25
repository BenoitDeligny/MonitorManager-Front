import { Monitor } from './monitor';

export class SoftwareVersion {
  id?: number;
  version?: string;
  monitors?: Monitor[];
}
