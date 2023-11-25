import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CreateContractorComponent} from '../create-contractor/create-contractors.component';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Task} from '../../../data/model/task';
import {Contractor} from '../../../data/model/contractor';
import Documents = documentsInterface.Documents;
import {IOption} from 'ng-select';

@Component({
  selector: 'cuenca-edit-contractors',
  templateUrl: './edit-contractors.component.html',
  styleUrls: ['./edit-contractors.component.css']
})
export class EditContractorComponent extends CreateContractorComponent implements OnInit {

  public contractor: Contractor = new Contractor();
  public contractormodality: Array<any>; /////Modalidad de contrato
  public typePerson: Array<any> = [{'id': '1', 'type': 'Natural'}, {'id': '2', 'type': 'Jurídico'}];
  public contractType: Array<any>; /////tipo de contrato
  public guarantee: Array<any>; /////////garantias
  public documents: Array<Documents>;
  public images: any;
  public repeatpass: String = '';
  public hasDocuments: Boolean = false;

  public categories: Array<IOption> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected contractorsManager: ContractorsManager,
              protected router: Router,
              public rolesManager: RolesManager,
              private activatedRoute: ActivatedRoute,
              protected tasksManager: TasksManager) {
    super(messagingService, proceduresManager, contractorsManager, router, rolesManager, tasksManager);
  }


  protected onDataLoaded(): void {

    this.getContractorsCategorias(); // get categorias de contratista

    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.contractorsManager.getObjectForEdit(String(id))
            .then(object => {
              this.contractor = <Contractor> object;
              console.log(this.contractor);
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  /////categorías contratista
  public getContractorsCategorias(): void {
    const componente = this;
    this.tasksManager.getContractorsCategorias()
      .then((categorias: any) => {
        const listcategories = categorias;
        ///console.log(listcategories);
        componente.categories = [];
        listcategories.forEach(function (item: any) {
          componente.categories.push({value: String(item.id), label: String(item.name)});
        });

      });
  }

  // update
  updateContractor(): void {
    const componente = this;
    if (this.isValidContractorUp()) {
      this.contractorsManager.update(this.contractor)
        .then((result: any) => {
          const message = {
            'tipo': 'Registrado',
            'message': 'El contratista ha sido actualizado satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/contractors'];
          this.router.navigate(link);
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

  /////Modalidad de contrato
  public getModalityC(): void {
    this.tasksManager.getModalityC()
      .then((modalities: any) => {
        this.contractormodality = modalities;
      });
  }

  // tipos de contrato
  public getContractType(): void {
    this.tasksManager.getContractType()
      .then((typeContract: any) => {
        this.contractType = typeContract;
      });
  }

  // validar registro
  protected isValidContractorUp(): boolean {
    ////console.log(this.contractor);
    /*  console.log(this.contractor.contract_number);
      console.log(this.contractor.contractor_name);
      console.log(this.contractor.contract_modality);
      console.log(this.contractor.type_person);
      console.log(this
      .contractor.number_identity);
      console.log(this.contractor.object);
      console.log(this.contractor.type_contract);
      console.log(this.contractor.total_value);
      console.log(this.contractor.way_to_pay);
      console.log(this.contractor.monthly_value);
      console.log(this.contractor.place_of_execution);
      console.log(this.contractor.initial_term);
      console.log(this.contractor.final_term);
      console.log(this.contractor.start_date);
      console.log(this.contractor.termination_date);
      console.log(this.contractor.guarantee);*/

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
    if (this.contractor.contract_modality === '0') {
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
    if (this.contractor.categories.length === 0) {
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
}
