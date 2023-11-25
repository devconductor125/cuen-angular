import {BaseObject} from './base-object';

export class Budget extends BaseObject {
  listId: string;
  value: string;
  material_name: string;
  action_name: string;
  task_id: number;
  created_at: string;
  updated_at: string;
  selected: boolean;
  associated: any;
  length: number;
  hash_map: string;
  action_material_id: number;
  action: string;
  type: string;
  material: string;
  associated_per_shares: string;
}
