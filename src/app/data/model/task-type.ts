import {BaseObject} from './base-object';

export class TaskType extends BaseObject {
  name: string;
  created_at: string;
  updated_at: string;

  constructor() {
    super();
  }
}
