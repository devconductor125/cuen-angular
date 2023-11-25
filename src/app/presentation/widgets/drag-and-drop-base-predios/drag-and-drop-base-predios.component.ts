import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component';
import {Task} from '../../../data/model/task';
import {BaseComponent} from '../../base-component/base-component';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {AuthService} from '../../../data/services/auth.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

declare var $: any; //// meter funciones javascript

@Component({
  selector: 'cuenca-drag-and-drop-base-predios',
  templateUrl: './drag-and-drop-base-predios.component.html',
  styleUrls: ['./drag-and-drop-base-predios.component.css']
})
export class DragAndDropBasePrediosComponent extends BaseComponent {

  constructor(protected tasksManager: TasksManager,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              private messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  public fileList: Array<any> = [];
  private fileInput: HTMLInputElement;

  onChange(event: any, fileInput: HTMLInputElement) {
    this.fileList = event.target.files;
    this.fileInput = fileInput;
  }

  uploadFiles(): void {

    if (this.fileList.length > 0) {


      Array.from(this.fileList).forEach((file: File) => {
        this.tasksManager.makeFileRequestBaseDocumento(file, '1')
          .then((response: any) => {
              this.notify.emit({payload: '1'});
          }, error => {
            this.notify.emit({payload: '2'});
          });
      });


    } else {

      const message = {
        'tipo': 'Error',
        'message': 'No ha seleccionado ningún archivo para cargar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    }

  }

}
