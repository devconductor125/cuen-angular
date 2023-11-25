import {Project} from './project';

export class Program {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  selected: boolean;
  projects: Array<Project>;
}
