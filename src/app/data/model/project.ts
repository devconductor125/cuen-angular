import {Program} from './program';
import {Activity} from './activity';

export class Project {
  id: number;
  name: string;
  description: string;
  state: number;
  program_id: 2;
  created_at: string;
  updated_at: string;
  program: Program;
  selected: boolean;
  activities: Array<Activity>;
}
