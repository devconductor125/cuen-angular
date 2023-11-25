import {ObjectMaterial} from './materials';

export class ObjectActions {
  id: number;
  name: string;
  type: string;
  length: string;
  value: string;
  material: ObjectMaterial;
  color: string;
  created_at: string;
  updated_at: string;
  good_practicess: string;
  activityId: string;
  type_id: string;

  constructor() {
    this.good_practicess = null;
    this.type = null;
    this.type_id = null;
    this.activityId = null;
    this.material = new ObjectMaterial();
    this.material.type = null;
    this.material.unit_id = null;
  }
}
