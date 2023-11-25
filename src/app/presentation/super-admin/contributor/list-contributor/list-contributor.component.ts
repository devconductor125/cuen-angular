import { Component, OnInit } from '@angular/core';
import {Asociado} from '../../../../data/model/asociado';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';

@Component({
  selector: 'app-list-contributor',
  templateUrl: './list-contributor.component.html',
  styleUrls: ['./list-contributor.component.scss']
})
export class ListContributorComponent implements OnInit {

  public arrAssociated: Array<Asociado> = [];
  constructor(private cuencaVerdeService: CuencaVerdeService) { }

  ngOnInit() {
    this.getAllAssociates();
  }

  private getAllAssociates(): void {
    this.cuencaVerdeService.getAllAssociates().then(
      (response: Array<Asociado>) => {
        this.arrAssociated = response;
      } , (response) => {
        console.log(response);
      }
    );
  }

  public getDateWithoutHour(date: string): String {
    const fecha = date.split(' ');
    const datos = fecha[0].split('-');
    const dia = datos[2];
    const mes = datos[1];
    const yy = datos[0];
    const fechaFinal = dia + '-' + mes + '-' + yy;
    return fechaFinal;
  }

}
