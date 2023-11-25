import {TaskType} from './task-type';
import {User} from './user';
import {Procedure} from './procedure';
import {TaskDetails} from './task-details';
import {BaseObject} from './base-object';
import {Subtype} from './subtype';
import {Activity} from './activity';
import {Project} from './project';
import {RoleClass} from './RoleClass';
import {PotentialDetail} from './potential-detail';
import Comments = commentsInterface.Comments;

export class Task extends BaseObject {
  title: string;
  description: string;
  startdate: string;
  deadline: string;
  option_date: number;
  state: number;
  type_id: number;
  status_id: number;
  comments: Array<Comments>;
  user: User;
  users: Array<User>;
  procedure: Procedure;
  taskType: TaskType;
  type: TaskType;
  role: RoleClass;
  details: TaskDetails;
  property: String;
  potential_detail: PotentialDetail;
  sub_type: Subtype;
  task_open_sub_type_id: string;
  route: String;
  isCartaIntencion: boolean;
  task_type_id: String;
  role_id: number;
  role_name: string;
  open: boolean;
  special: boolean;
  activity: Activity;
  type_name: string;
  project: Array<Project>;
  budgetOpen: any;
  budgetOpenSpecies: any;
  process: any;
  propertyName: any;

  constructor() {
    super();
    this.user = new User();
    this.procedure = new Procedure();
    this.details = new TaskDetails();
    this.role = new RoleClass();
    this.potential_detail = new PotentialDetail();
  }

  public isCanShowAporteSelection() {
    return this.procedure.type_process === 'abierta' ||
      ((this.procedure.type_process === 'psa' ||
        this.procedure.type_process === 'erosion' ||
        this.procedure.type_process === 'hidrico' ||
        this.procedure.type_process === 'comunicacion') && this.open);
  }

  public isShouldBeOpen() {
    if (!this.open) {
      this.open = this.procedure.type_process === 'abierta' ||
        this.procedure.type_process === 'psa' ||
        this.procedure.type_process === 'erosion' ||
        this.procedure.type_process === 'hidrico' ||
        this.procedure.type_process === 'comunicacion' ||
        this.procedure.type_process === 'abierta';
    }
    return this.open;
  }

  public isSpecialTaskVisibility() {
    return this.procedure.type_process !== 'gestion';
  }

  public isDisabledSpecialCheckbox() {
    if (this.procedure.type_process === 'abierta') {
      this.open = true;
      this.special = true;
    }
    return this.procedure.type_process === 'abierta';
  }

  public isOpenTaskVisibility() {
    return this.procedure.type_process === 'psa' ||
      this.procedure.type_process === 'erosion' ||
      this.procedure.type_process === 'hidrico' ||
      this.procedure.type_process === 'comunicacion' ||
      this.procedure.type_process === 'abierta';
  }

  public isHidrico() {
    return this.procedure.type_process === 'hidrico';
  }

  public needsToFetchSpecialAssociates() {
    return this.procedure.type_process !== 'abierta' && !(this.procedure.type_process === 'gestion' && this.open) && (!this.special || this.procedure.type_process === 'psa');
  }

  public isCanShowAporteValue() {
    return (this.open && (this.procedure.type_process === 'erosion' ||
      this.procedure.type_process === 'psa' ||
      this.procedure.type_process === 'hidrico' ||
      this.procedure.type_process === 'comunicacion' ||
      this.procedure.type_process === 'abierta')) ||
      (this.procedure.type_process === 'gestion' && this.open);
  }

  public needsToFetchActivities() {
    return this.procedure.type_process === 'abierta' ||
      this.procedure.type_process === 'gestion' ||
      (this.special && (
          this.procedure.type_process === 'erosion' ||
          this.procedure.type_process === 'hidrico' ||
          this.procedure.type_process === 'comunicacion')
      );
  }

  public canSkipActivitySelection() {
    return (!this.special && (this.procedure.type_process === 'erosion' ||
      this.procedure.type_process === 'hidrico' ||
      this.procedure.type_process === 'comunicacion')) || (this.procedure.type_process === 'psa');
  }

  public isNotGestion() {
    return !(this.procedure.type_process === 'gestion');
  }
}
