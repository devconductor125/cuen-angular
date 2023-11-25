import { Component, OnInit } from '@angular/core';
import {Asociado} from '../../../../data/model/asociado';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-contributor',
  templateUrl: './create-contributor.component.html',
  styleUrls: ['./create-contributor.component.scss']
})
export class CreateContributorComponent implements OnInit {

  public arrTipeAssociated: Array<any> = [
    {
      name: 'Asociado',
      type: 'associated'
    },
    {
      name: 'Aliado',
      type: 'allied'
    }
  ];
  public modelAssociated: Asociado;
  public strIdAssociated: string;
  public boolCreate: boolean;

  public strtitle: string;

  public boolDisable: boolean;

  constructor(private cuencaVerdeService: CuencaVerdeService,
              private router: Router,
              private activateRouter: ActivatedRoute,
              private messagingService: MessagingService) {
    this.modelAssociated = new Asociado();
    this.strIdAssociated =  this.activateRouter.snapshot.params.id;
    this.boolCreate = true;
    this.boolDisable = false;
  }

  ngOnInit() {
    if (this.strIdAssociated !== '0') {
      this.boolCreate = false;
      this.strtitle = 'EDITAR';
      this.getDataContributor();
      this.setVariableBoolEdit();
    } else  {
      this.strtitle = 'REGISTRAR';
    }
  }

  public saveAssociated() {
    this.cuencaVerdeService.createAssociated(this.modelAssociated).then(
      (respoonse) => {
        this.setAlert('Asociado', 'Creado', 'alert-success');
        this.router.navigate(['app/list-contributor']);
      }, (error) => {
        this.setAlert('Asociado', error, 'alert-danger');
      }
    );
  }

  private setAlert(type: string, strMessage: string, strStyle: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': strStyle
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private getDataContributor(): void {
    this.cuencaVerdeService.getDataContributor(this.strIdAssociated).then(
      (response: Asociado) => {
        this.modelAssociated = response;
      }, (error) => {
        console.log(error);
      }
    );
  }

  public setVariableBoolEdit() {
    this.boolDisable = !this.boolDisable;
  }

  public updateAssociated() {
    this.cuencaVerdeService.updateAssociate(this.modelAssociated).then(
      (respoonse) => {
        this.setAlert('Asociado', 'Editado', 'alert-success');
        this.router.navigate(['app/list-contributor']);
      }, (error) => {
        this.setAlert('Asociado', error, 'alert-danger');
      }
    );
  }
}
