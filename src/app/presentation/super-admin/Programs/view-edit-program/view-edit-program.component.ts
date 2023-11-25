import { Component, OnInit } from '@angular/core';
import {Categories} from '../../../../data/model/categories';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Program} from '../../../../data/model/program';

@Component({
  selector: 'app-view-edit-program',
  templateUrl: './view-edit-program.component.html',
  styleUrls: ['./view-edit-program.component.scss']
})
export class ViewEditProgramComponent implements OnInit {

  public dataProgram: Program;
  public boolViewEdit: boolean;
  private idProgram: string;
  constructor(private messagingService: MessagingService,
              private cuencaVeServices: CuencaVerdeService,
              private router: Router,
              private routerActive: ActivatedRoute) {
    this.dataProgram = new Program();
    this.boolViewEdit = true;
  }

  ngOnInit() {
    this.idProgram = this.routerActive.snapshot.params.id;
    this.getDataProgram();
  }

  private getDataProgram() {
    this.cuencaVeServices.getDataProgram(this.idProgram).then(
      (response) => {
        this.dataProgram = response;
      },
      (error) => {
        this.setMessageError('Error', error.statusText);
      }
    );
  }

  public setVarEdit() {
    this.boolViewEdit = !this.boolViewEdit;
  }

  public guardar() {
    if (this.isValidProgram()) {
      this.cuencaVeServices.updateProgram(this.dataProgram).then(
        (response) => {
          this.setMessageSuccess('Programa', 'Editado satisfactoriamente');
          this.boolViewEdit = !this.boolViewEdit;
        },
        (error) => {
          this.setMessageError('Error', error.statusText);
        }
      );
    }
  }


  protected isValidProgram(): boolean {
    if (!this.dataProgram.name || this.dataProgram.name.length === 0) {
      this.setMessageError('Error ', 'Ingresa el nombre del Programa');
      return false;
    }
    return true;
  }
  private setMessageSuccess(type: string, strMessage: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }
  private setMessageError(type: string, strMessage: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

}
