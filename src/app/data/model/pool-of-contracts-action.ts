import {BaseObject} from './base-object';

export class PoolOfContractsAction extends BaseObject {
  pool_id: number;
  process_id: string;
  budget_id: number;
  action: string;
  type: string;
  material: string;
  contractor: any;
  task_id: any;
}
