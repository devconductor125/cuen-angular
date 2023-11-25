import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Task} from '../../../data/model/task';
import {FormComunication} from '../../../data/model/formComunication';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';

declare var $: any;

@Component({
  selector: 'cuenca-form-edit-task-comunication',
  templateUrl: './form-edit-task-comunication.component.html',
  styleUrls: ['./form-edit-task-comunication.component.css']
})
export class FormEditTaskComunicationComponent extends BaseComponent implements OnInit {

  @Input() public formData: FormComunication;
  @Input() public listAssociated: any;
  @Input() public task: any;

  public filesList: Array<File> = [];

  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  public isDisabled: Boolean = false;

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager,
              protected messagingService: MessagingService,
              public cuencaService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.URL_BASE_IMAGES = this.cuencaService.API_URL_IMAGES;
  }

  editForm() {
    this.isDisabled = true;
    if (this.validForm()) {
      this.sendEditForm();
    }
  }

  // validar
  protected validForm(): boolean {
    if (!this.formData.event_name || this.formData.event_name.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Por favor el nombre del evento es obligatorio',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.formData.date) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la fecha de la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  private sendEditForm() {
    this.formData.type = '1';
    this.tasksManager.editFormComunication(this.formData, this.task.id)
      .then((response: any) => {
        this.notify.emit({payload: '1'}); // Success
        this.formData = new FormComunication();
        this.isDisabled = false;
      }, (error: any) => {
        this.notify.emit({payload: '2'}); // Error
        this.isDisabled = false;
      });
  }

  getListImages($event: any) {
    this.filesList = $event.payload;
    this.formData.images = this.filesList;
  }
}
