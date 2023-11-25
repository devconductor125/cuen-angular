import {BaseObject} from './base-object';

export class User extends BaseObject {
  id: string;
  name: string;
  names: string;
  last_names: string;
  pass: string;
  passRepeat: string;
  email: string;
  rol_id: string;
  created_at?: any;
  updated_at?: any;
}
