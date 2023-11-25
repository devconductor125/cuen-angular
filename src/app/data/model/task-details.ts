import {TaskDetailObject} from './task-details-object';

export class TaskDetails {
  status: TaskDetailObject;
  type: TaskDetailObject;
  process: TaskDetailObject;
  activity: TaskDetailObject;
  project: TaskDetailObject;
  program: TaskDetailObject;
  user: TaskDetailObject;
  role: TaskDetailObject;
  startdate: TaskDetailObject;
  deadline: TaskDetailObject;

  constructor() {
    this.status = new TaskDetailObject();
    this.type = new TaskDetailObject();
    this.process = new TaskDetailObject();
    this.activity = new TaskDetailObject();
    this.project = new TaskDetailObject();
    this.program = new TaskDetailObject();
    this.user = new TaskDetailObject();
    this.role = new TaskDetailObject();
    this.startdate = new TaskDetailObject();
    this.deadline = new TaskDetailObject();
  }
}
