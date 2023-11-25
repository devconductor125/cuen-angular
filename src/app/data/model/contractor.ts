import {User} from './user';

export class Contractor {
  id: string;
  user: User;
  contract_number: string;
  contract_modality: string;
  type_person: string;
  type_indentity: string;
  number_identity: string;
  object: string;
  type_contract: string;
  total_value: string;
  way_to_pay: string;
  monthly_value: string;
  place_of_execution: string;
  initial_term: string;
  final_term: string;
  start_date: string;
  termination_date: string;
  guarantee: string;
  renew_guarantee: Boolean;
  number_modality: string;
  categories: Array<any>;

  constructor() {
    this.user = new User();
  }
}
