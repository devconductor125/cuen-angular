import {Project} from './project';

export class Activity {
  id: number;
  name: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  selected: boolean;
  project: Project;
  program: any;
}
