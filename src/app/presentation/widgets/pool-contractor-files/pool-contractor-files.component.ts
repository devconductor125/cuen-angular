import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
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
import {PoolOfContractsManager} from '../../../data/managers/pool-of-contracts.manager';
import {FileContractor} from '../../../data/model/fileContractor';

declare var $: any; //// meter funciones javascript

@Component({
  selector: 'cuenca-pool-contractor-file',
  templateUrl: './pool-contractor-files.component.html',
  styleUrls: ['./pool-contractor-files.component.css']
})
export class PoolContractorFilesComponent extends BaseComponent implements OnInit {

  public fileContractor: FileContractor = new FileContractor();
  public listTypeContract: Array<any> = [];
  public listTypeFile: Array<any> = [];
  public fileList: Array<any> = [];

  @Input() public idPool: any;
  @Input() public typeFileId: any;
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();

  constructor(protected tasksManager: TasksManager,
              protected proceduresManager: ProceduresManager,
              protected poolOfContractsManager: PoolOfContractsManager,
              public rolesManager: RolesManager,
              private messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
  }


  protected onGotRoles(): void {
    this.getSelectContracts();
  }

  onChange(event: any) {
    this.fileList = event.target.files;
  }

  // subir archivo
  uploadFiles(): void {

    if (this.isValidFile()) {

      this.fileContractor.pool_id = this.idPool;

      Array.from(this.fileList).forEach((file: File) => {

        this.fileContractor.file = file;

        this.tasksManager.sendFilePool(this.fileContractor)
          .then((response: any) => {
            this.notify.emit({payload: '1'});
            this.fileContractor = new FileContractor();
            this.fileList = [];
            $('#files').val(null);
          }, error => {
            this.notify.emit({payload: '2'});
          });
      });

    }

  }

  // seleccione el tipo de contrato
  protected getSelectContracts(): void {
    this.poolOfContractsManager.getTypeContractorPool()
      .then((response: any) => {
        if (response instanceof Array) {
          this.listTypeContract = response;
        } else {
          this.listTypeContract = [];
        }
        this.setTypeFile(this.typeFileId) ;
      });
  }

  // set tipo de archivo
  public setTypeFile(idTypeContract: any) {
    this.fileContractor.type_contract = idTypeContract;
    if (Number(idTypeContract) !== 0) {
      const listType: any = this.listTypeContract.filter((type: any) => String(type.id) === String(idTypeContract));
      this.listTypeFile = listType[0].files;
    } else {
      this.listTypeFile = [];
      this.fileContractor.type_file = '0';
    }
  }

  // validar carga
  protected isValidFile(): boolean {

    if (Number(this.fileContractor.type_contract) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona el Tipo de Contrato',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

    if (Number(this.fileContractor.type_file) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona el Tipo de Archivo',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

    if (this.fileList.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'No ha seleccionado ningún archivo para cargar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

}
