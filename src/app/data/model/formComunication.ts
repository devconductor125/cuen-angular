export class FormComunication {
  id: string;
  task_id: string;
  municipality: string;
  basin: string;
  sidewalk: string;
  objective_group: String = '0';
  date: any;
  associated_name: String = '0';
  associated_id: string;
  number_attendees: string;
  number_trees: string;
  experence_type: String = '0';
  experence_consolidated: String = '0';
  event_name: string;
  asistent_list: String = '0';
  registry_photographic:  String = '0';
  type: String;
  images: Array<any> = [];
}
