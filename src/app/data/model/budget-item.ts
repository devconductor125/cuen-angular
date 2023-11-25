import {BaseObject} from './base-object';

export class BudgetItem extends BaseObject {
  actionId: number;
  materialId: number;
  length: string;
  hash: string;
}
