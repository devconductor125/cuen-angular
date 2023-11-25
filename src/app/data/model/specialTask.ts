import {BaseObject} from './base-object';

export class SpecialTask extends BaseObject {
  description: string;
  date_start: string;
  date_end: string;
  option_date: number;
  state: number;
  task_status_id: number;
  property_id?: any;
  process_id: number;
  task_open_sub_type_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  type: string;
  selected: boolean;
}
