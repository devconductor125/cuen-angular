import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {FormComunication} from '../../../data/model/formComunication';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {DragAndDropFormComunicationComponent} from '../drag-and-drop-form-comunication/drag-and-drop-form-comunication.component';

@Component({
  selector: 'cuenca-form-task-comunication',
  templateUrl: './form-task-comunication.component.html',
  styleUrls: ['./form-task-comunication.component.css']
})
export class FormTaskComunicationComponent extends BaseComponent implements OnInit {

  @Input() public taskId: any;
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild('filesBox') filesBox: DragAndDropFormComunicationComponent;

  public formData: FormComunication = new FormComunication();
  public listFormData: Array<FormComunication> = [];
  public isDisabled: Boolean = false;

  public listAssociated: any;

  public filesList: Array<File> = [];

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager,
              protected messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getListForms();
  }

  // crear formulario
  createForm() {
    this.isDisabled = true;
    if (this.validForm()) {
      this.registerForm();
      this.filesBox.reset();
    } else {
      this.isDisabled = false;
    }
  }

  // obtener listado de imagenes
  getListImages($event: any) {
    this.filesList = $event.payload;
    this.formData.images = this.filesList;
  }

  // validar formularios
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
    if (this.formData.registry_photographic === 'Si') {
      if (this.formData.images.length === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Por favor ingrese registro fotográfico',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
    } else {
      this.formData.images = [];
    }
    return true;
  }

  // registrar formularios
  private registerForm() {
    this.formData.task_id = this.taskId.id;
    this.formData.type = '1';
    this.cuencaServices.insertFormComunicationWithImages(this.formData).then(success => {
      if (success) {
        this.notify.emit({payload: '1'}); // Success
        this.formData = new FormComunication();
        this.isDisabled = false;
        this.getListForms();
      } else {
        this.notify.emit({payload: '2'}); // Error
        this.isDisabled = false;
      }
    }, (error: any) => {
      this.isDisabled = false;
    });
  }

  // get listado de formularios registrados
  public getListForms() {
    this.tasksManager.getListFormDataComunication(this.taskId.id)
      .then((listForm: any) => {
        this.listFormData = listForm;
      });
  }

  // Obtener asociados
  private getAssociated(): Promise<any> {
    const component = this;
    return new Promise((resolve, reject) => {
      this.cuencaServices.getAssociatedTask('comunicacion')
        .then((response: any) => {
          if (response.code === 500) {
            component.formData.associated_name = '0';
            const message = {
              'tipo': 'Error',
              'message': 'No existen asociados con aportes',
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          } else {
            component.listAssociated = [];
            component.listAssociated = response.type_1.concat(response.type_2);
            component.formData.associated_name = '0';
          }
        });
    });
  }

  // mensaje de registro
  messageRegisterForm($event: any) {
    this.listFormData = [];
    this.getListForms();
    if ($event.payload === '1') {
      const message = {
        'tipo': 'Registrado',
        'message': 'Evento Registrado Satisfactoriamente',
        'style': 'alert-success'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    } else {
      const message = {
        'tipo': 'Error',
        'message': 'Ha ocurrido un error desconocido',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }
}
