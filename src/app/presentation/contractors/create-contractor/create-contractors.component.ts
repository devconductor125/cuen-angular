import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Contractor} from '../../../data/model/contractor';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {IOption} from 'ng-select';
import Documents = documentsInterface.Documents;

@Component({
  selector: 'cuenca-create-contractors',
  templateUrl: './create-contractors.component.html',
  styleUrls: ['./create-contractors.component.css']
})
export class CreateContractorComponent extends BaseComponent implements OnInit {
  public contractor: Contractor = new Contractor();
  public contractormodality: Array<any>; /////Modalidad de contrato
  public typePerson: Array<any> = [{'id': '1', 'type': 'Natural'}, {'id': '2', 'type': 'Jurídico'}];
  public typeIdentity: Array<any> = [];
  public contractType: Array<any>; /////tipo de contrato
  public guarantee: Array<any>; /////////garantias
  public documents: Array<Documents>;
  public images: any;
  public repeatpass: String = '';
  public hasDocuments: Boolean = false;
  public userId: String;
  public categories: Array<IOption> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected contractorsManager: ContractorsManager,
              protected router: Router,
              public rolesManager: RolesManager,
              protected tasksManager: TasksManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {

    /*this.categories = [
      {value: '1', label: 'Categoría 1'},
      {value: '2', label: 'Categoría 2'},
      {value: '3', label: 'Categoría 3'},
      {value: '4', label: 'Categoría 4'},
      {value: '5', label: 'Categoría 5'},
    ];*/

    //// this.getContractorsCategorias();


    /// objeto ejemplo
    this.contractor.contract_modality = '1';
    this.contractor.type_person = '0';
    this.contractor.type_indentity = '0';
    this.contractor.type_contract = '0';
    this.contractor.guarantee = '0';
    this.contractor.renew_guarantee = false;
    this.contractor.user.rol_id = '5';
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.contractorsManager.loadAllObjects();
    this.onDataLoaded();
    // > Contractor
    this.getModalityC();
    this.getContractType();
    this.guarantee = [
      {'id': '1', 'name': 'De Cumplimiento'},
      {'id': '2', 'name': 'De Buen Manejo'},
      {'id': '3', 'name': 'De Correcta Inversión'},
      {'id': '4', 'name': 'No Aplica'}
    ];

    this.contractor.object = 'Objeto';
    this.contractor.type_contract = '1';
    this.contractor.total_value = 'total';
    this.contractor.way_to_pay = 'pago';
    this.contractor.monthly_value = 'monto mensual';
    this.contractor.place_of_execution = 'lugar';
    this.contractor.initial_term = '2018/06/05';
    this.contractor.final_term = '2018/06/05';
    this.contractor.start_date = '2018/06/05';
    this.contractor.termination_date = '2018/06/05';
    this.contractor.guarantee = '1';
    this.contractor.renew_guarantee = true;
    this.contractor.number_modality = '0';

    this.getContractorsCategorias(); // obtener las categorias

  }

  protected onDataLoaded(): void {
  }

  refreshFiles($event: object) {
    this.obtenerArchivos(); /// obtener archivos del contratista
  }

  public obtenerArchivos() {
    this.documents = null;
    this.tasksManager.getAllTaskFiles(null)
      .then((files: any) => {
        if (files.images.length > 0 || files.documents.length > 0) {
          if (files.images.length > 0) {
            this.images = files.images;
          }
          if (files.documents.length > 0) {
            this.documents = files.documents;
          }
          this.hasDocuments = true;
        } else {
          this.hasDocuments = false;
        }
      });
  }

  /////Modalidad de contrato
  public getModalityC(): void {
    this.tasksManager.getModalityC()
      .then((modalities: any) => {
        this.contractormodality = modalities;
      });
  }

  /////categorías contratista
  public getContractorsCategorias(): void {
    const componente = this;
    this.tasksManager.getContractorsCategorias()
      .then((categorias: any) => {
        const listcategories = categorias;
        componente.categories = [];
        listcategories.forEach(function (item: any) {
          componente.categories.push({value: String(item.id), label: String(item.name)});
        });

      });
  }

  /// tipo de contrato
  public getContractType(): void {
    this.tasksManager.getContractType()
      .then((typeContract: any) => {
        this.contractType = typeContract;
      });
  }

  // save
  saveContractor(): void {
    const componente = this;
    if (this.isValidContractor()) {
      this.contractorsManager.create(this.contractor)
        .then((result: any) => {
          const message = {
            'tipo': 'Registrado',
            'message': 'El contratista ha sido registrado satisfactoriamente',
            'style': 'alert-success'
          };
          componente.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/contractors'];
          componente.router.navigate(link);
        }, function (reason: string) {
          const message = {
            'tipo': 'Error',
            'message': reason,
            'style': 'alert-danger'
          };
          componente.messagingService.publish(new BusMessage('alerta', message));
        });
    }
  }

  // validar campos antes de registrar
  protected isValidContractor(): boolean {
    if (!this.contractor.user.name || this.contractor.user.name.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.user.email || this.contractor.user.email.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Email del nuevo usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.user.names || this.contractor.user.names.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el nombre del contratista',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.user.last_names || this.contractor.user.last_names.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el apellido del contratista',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.contractor.number_modality === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la modalidad del contrato',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.contractor.type_person === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el tipo de persona',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.contractor.type_indentity === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el tipo documento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.number_identity || this.contractor.number_identity.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Número de Identidad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.object || this.contractor.object.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Objeto',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.contractor.type_contract === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el tipo de contrato',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.total_value || this.contractor.total_value.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Monto Total',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.way_to_pay || this.contractor.way_to_pay.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la forma de pago',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.monthly_value || this.contractor.monthly_value.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el monto mensual',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.place_of_execution || this.contractor.place_of_execution.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el lugar de ejecución',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.initial_term) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Plazo Inicial',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.final_term) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Plazo Final',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.start_date) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la Fecha de Inicio',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.termination_date) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la Fecha de Terminación',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.contractor.guarantee === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la Garantía',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.contractor.categories || this.contractor.categories.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona al menos una categoría para el contratista',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  public setTypeIdentity() {
    let arrData: Array<any> = [];
    if (this.contractor.type_person === '1') {
      arrData = [
        {
          'id': '1',
          'type': 'Cédula de ciudadania'
        },
        {
          'id': '2',
          'type': 'Cédula de extranjería'
        }
        ];
    } else if (this.contractor.type_person === '2') {
      arrData = [
        {
          'id': '1',
          'type': 'Nit'
        },
        {
          'id': '2',
          'type': 'Cédula de representante'
        }
        ];
    }
    this.typeIdentity = arrData;
  }
}
