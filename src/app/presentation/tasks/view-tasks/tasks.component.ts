import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Task} from '../../../data/model/task';
import {TaskType} from '../../../data/model/task-type';
import {RolesManager} from '../../../data/managers/roles.manager';
import Role = roleInterface.Role;

@Component({
  selector: 'cuenca-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends BaseComponent implements OnInit {
  public tasks: Array<any>;
  public allTasks: Array<any>;
  public selectedTaskType: TaskType;

  public rolesList: Array<Role> = [];
  public roleFilter: string;
  public selectedFilter: number;
  public selectedRole: Role;
  public filterActive: Boolean = false;

  constructor(protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
    this.selectedFilter = 0;
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.tasksManager.loadAllObjects()
      .then(response => {
        if (response instanceof Array) {
          // response = response.filter((task: Task) => task.sub_type && task.procedure);
          response = this.sortTasksById(response);
          this.tasks = response;
          this.allTasks = Object.assign([], response);
          this.getRolesList(response);
        }
      });
    this.getUserRoles(this);
    this.roleFilter = '0';
  }

  private getRolesList(tasks: Array<Task>) {
    const rolesMap: Map<number, Role> = new Map();

    const placeholder: Role = <Role>{};
    placeholder.id = 0;
    placeholder.name = 'Selecciona un Rol';
    rolesMap.set(placeholder.id, placeholder);
    this.selectedRole = placeholder;

    tasks.forEach(function (task) {
      const role = <Role>{};
      role.id = task.role_id;
      role.name = task.role_name;
      rolesMap.set(role.id, role);
    });
    this.rolesList = Array.from(rolesMap.values());
  }

  filterTasksByRole(selectedRole: Role): void {
    if (selectedRole.id === 0) {
      this.tasks = Object.assign([], this.allTasks);
    } else {
      this.tasks = this.allTasks.filter((task: Task) => task.role_id === selectedRole.id);
    }
  }

  deleteTask(task: Task): void {
    const component = this;
    this.shouldDelete(function () {
      component.tasksManager.deleteObject(task)
        .then((success: boolean) => {
          if (success) {
            let i = component.tasks.length;
            while (i--) {
              if (component.tasks[i].id === task.id) {
                component.tasks.splice(i, 1);
              }
            }
          }
        });
    });
  }

  filterApply(): void {
    if (this.validFilter()) {
      this.filterActive = true;
    }
  }

  filterClear(): void {
    this.roleFilter = '0';
    this.filterActive = false;
  }

  validFilter(): Boolean {
    if (this.roleFilter === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un tipo de filtro',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      this.filterActive = false;
      return false;
    }
    return true;
  }

  isCartaIntencion(task: Task): boolean {
    return String(task.route).includes('carta');
  }

  private sortTasksById(response: Array<Task>) {
    const tasks = response.filter(task => !(task.id + '').includes('open'));
    const openTasks = response.filter(task => (task.id + '').includes('open'));
    tasks.sort(this.sortTasks);
    openTasks.sort(this.sortTasks);
    return tasks.concat(openTasks);
  }

  private sortTasks(task1: any, task2: any): number {
    if (task1.id < task2.id) {
      return 1;
    }
    if (task1.id > task2.id) {
      return -1;
    }
    return 0;
  }
}
