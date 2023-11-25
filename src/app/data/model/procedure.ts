import {Task} from './task';
import {BaseObject} from './base-object';
import {Program} from '../model/program';
import {Project} from './project';
import {Activity} from './activity';
import {Budget} from './budget';
import {SpecialTask} from './specialTask';

export class Procedure extends BaseObject {
  id: string;
  name: string;
  property: any;
  procedure_id: string;
  procedure_name: string;
  state: string;
  program: Program;
  project: Project;
  programs: Array<Program>;
  projects: Array<Project>;
  activities: Array<Activity>;
  description: string;
  created_at: string;
  updated_at: string;
  execution_time: string;
  status: string;
  tasks: Array<Task> = [];
  budget: Array<Budget>;
  task_opens: Array<SpecialTask>;
  selected: boolean;
  isHidricoErosivo: boolean;
  animationDelay: number;
  animationDuration: number;
  progressBarColor: string;
  subTypeStep: number;
  subTypeTotal: number;
  type_process: String;
  type_comunication: any;
  nest_procedure: any = false;
  parent_procedure: any = '0';


  hasGotTasks() {
    return this.tasks != null && this.tasks.length > 0;
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks: Array<Task>): void {
    this.tasks = tasks;
  }

  setProgressBarAnimationValues() {
    this.animationDelay = 0;
    this.animationDuration = Math.floor(Math.random() * (1800 - 1200 + 1)) + 1200;
  }
}
