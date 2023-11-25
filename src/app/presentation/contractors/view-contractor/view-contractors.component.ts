import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Contractor} from '../../../data/model/contractor';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {GeoJsonService} from '../../../data/services/geo-json.service';
import {IOption} from 'ng-select';
import Documents = documentsInterface.Documents;


@Component({
  selector: 'cuenca-view-contractors',
  templateUrl: './view-contractors.component.html',
  styleUrls: ['./view-contractors.component.css']
})
export class ContractorsViewComponent extends BaseComponent implements OnInit {
  public contractor: Contractor = new Contractor();
  public images: any;
  public documents: Array<Documents>;
  public hasDocuments: Boolean = false;
  public repeatpass: String = '';
  public contractormodality: Array<any>; /////Modalidad de contrato
  public contractType: Array<any>; /////tipo de contrato
  public guarantee: Array<any>; /////////garantias
  public typePerson: Array<any> = [
    {'id': '1', 'type': 'Natural'},
    {'id': '2', 'type': 'Jurídico'}
  ];

  public typeIdentity: Array<any> = [];

  public idUser: string;

  public categories: Array<IOption> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected contractorManager: ContractorsManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private geoJsonService: GeoJsonService,
              public rolesManager: RolesManager,
              protected tasksManager: TasksManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getContractorsCategorias();
    this.getModalityC();
    this.getContractType();
    this.getContractor();
    this.guarantee = [
      {'id': '1', 'name': 'De Cumplimiento'},
      {'id': '2', 'name': 'De Buen Manejo'},
      {'id': '3', 'name': 'De Correcta Inversión'},
      {'id': '4', 'name': 'No Aplica'}
    ];

  }

  ///// Modalidad de contrato
  public getModalityC(): void {
    this.tasksManager.getModalityC()
      .then((modalities: any) => {
        this.contractormodality = modalities;
      });
  }

  // get tipo de contrato
  public getContractType(): void {
    this.tasksManager.getContractType()
      .then((typeContract: any) => {
        this.contractType = typeContract;
      });
  }

  public getContractor(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        this.idUser = idString;
        const id: number = Number(idString);
        if (id > 0) {
          this.contractorManager.getContractorDetails(String(id))
            .then(contractor => {
              this.contractor = contractor;
              console.log(this.contractor);
              this.setTypeIdentity();
              ///this.contractor.categories = ['1', '2'];
              ///console.log(this.contractor);
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  refreshFiles($event: object) {
    this.obtenerArchivos();
  }

  ///// categorías contratista
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

  public obtenerArchivos() {
    this.documents = null;
    this.contractorManager.getAllContractorFiles(this.contractor)
      .then((files: any) => {
        if (files.images && files.documents) {
          if (files.images.length > 0 || files.documents.length > 0) {
            if (files.images.length > 0) {
              this.images = files.images;
            }
            if (files.documents && files.documents.length > 0) {
              this.documents = files.documents;
            }
            this.hasDocuments = true;
          } else {
            this.hasDocuments = false;
          }
        }
      });
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
