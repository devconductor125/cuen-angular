import {BaseObject} from './base-object';
import {PoolOfContractsAction} from './pool-of-contracts-action';
import {PoolOfContractsOpenTask} from './pool-of-contracts-open-task';

export class ActivityValueByContractor extends BaseObject {
  action_name: string;
  material_name: string;
  action_id: number;
  material_id: number;
  action_value: string;
  pool_id: string;
  budget: number[];
}
