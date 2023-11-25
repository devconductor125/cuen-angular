import {Component, OnInit} from '@angular/core';
import {CreateTaskComponent} from '../create-task/create-task.component';
import {ParamMap} from '@angular/router';
import {Task} from '../../../data/model/task';
import {Procedure} from '../../../data/model/procedure';
import {BusMessage} from '../../../data/services/messaging.service';
import {TaskType} from '../../../data/model/task-type';
import Role = roleInterface.Role;

declare var $: any;

@Component({
  selector: 'cuenca-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent extends CreateTaskComponent implements OnInit {
  public task: Task;
  public showRoleAndUserSelector = true;

  protected onDataLoaded(): void {

    const componente = this;

    this.activatedRoute.paramMap
      .map((params: ParamMap) => params.get('id') + '')
      .subscribe(id => {
        if (id) {
          this.tasksManager.getObjectForEdit(String(id))
            .then(object => {
              this.task = <Task> object;
              if (Number(this.task.taskType.id) === 5) {
                this.showExtraFields = false;
              }
              this.mapTaskObjects();

              const objetoSelected = this.roles.filter(rol => String(rol.id) === String(this.task.role.id));
              ///console.log(objetoSelected.length);
              if (objetoSelected.length === 0) {
                this.task.role.id = 0;
                this.task.user.id = '0';
              }

              const arreglo = this.task.user.id;
              let conta = 0;
              this.users.forEach(function (usuario) {

                const coin = arreglo.indexOf(usuario.id);

                if (coin >= 0) {
                  componente.usuariosTareaList[conta] = usuario.id;
                } else {
                  componente.usuariosTareaList[conta] = null;
                }
                conta++;
              });
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  /// mapear objeto
  private mapTaskObjects() {
    const component = this;
    component.procedures.forEach(function (procedure: Procedure) {
      if (Number(procedure.id) === Number(component.task.procedure)) {
        component.task.procedure = procedure;
      }
    });
    component.roles.forEach(function (role: Role) {
      if (Number(role.id) === Number(component.task.role.id)) {
        component.task.role = role;
        component.getUsers();
      }
    });
    const taskType: TaskType = new TaskType();
    taskType.id = String(this.task.type_id);
    taskType.name = this.task.type_name;
    this.taskTypes = [];
    this.taskTypes.push(taskType);
    this.task.taskType = taskType;
    if (!this.hasValidRole()) {
      this.showRoleAndUserSelector = false;
    }
  }

  // actualizar tarea
  public updateTask(): void {
    if (this.isValidTaskEdit()) {
      this.tasksManager.update(this.task, this.usuariosTareaList.filter(Number))
        .then(success => {
          if (success) {
            const message = {
              'tipo': 'Actualizada',
              'message': 'La tarea ha sido actualizada satisfactoriamente',
              'style': 'alert-success'
            };

            $('#cModal').modal('toggle');
            this.messagingService.publish(new BusMessage('alerta', message));

            const link = ['/app/tasks'];
            this.router.navigate(link);
          }
        });
    }
  }

  // validar tarea antes de editar
  protected isValidTaskEdit(): boolean {
    if (Number(this.task.procedure.id) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un Procedimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.showExtraFields) {
      /*if (!this.task.property || this.task.property.length === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona un Predio',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }*/
      if (!this.task.description || this.task.description.length === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Ingresa la descripción de la tarea',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
    }
    /*console.log(this.task.taskType.id);
    if (Number(this.task.taskType.id) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un tipo de tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }*/
    this.task.title = this.task.taskType.name;
    if (!this.task.title || this.task.title.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el título de la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.task.role || Number(this.task.role.id) === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un rol para enviar la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.usuariosTareaList || this.usuariosTareaList.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un usuario para enviar la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  private hasValidRole() {
    const role = Number(this.task.role.id);
    return role === 0 || role === 1 || role === 4 || role === 5;
  }
}
