import { Component, OnInit } from '@angular/core';
import {Categories} from '../../../../data/model/categories';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-edit-category',
  templateUrl: './view-edit-category.component.html',
  styleUrls: ['./view-edit-category.component.scss']
})
export class ViewEditCategoryComponent implements OnInit {

  public dataCategory: Categories;
  public boolViewEdit: boolean;
  private idCategory: string;

  constructor(private messagingService: MessagingService,
              private cuencaVeServices: CuencaVerdeService,
              private router: Router,
              private routerActive: ActivatedRoute) {
    this.dataCategory = new Categories();
    this.boolViewEdit = true;
  }

  ngOnInit() {
    this.idCategory = this.routerActive.snapshot.params.id;
    this.getDataCategory();
  }

  private getDataCategory() {
    this.cuencaVeServices.getDataCategory(this.idCategory).then(
      (response) => {
        this.dataCategory = response;
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
    if (this.isValidCategory()) {
      this.cuencaVeServices.updateCategory(this.dataCategory).then(
        (response) => {
          this.setMessageSuccess('Categoria', 'Editada satisfactoriamente');
          this.boolViewEdit = !this.boolViewEdit;
        },
        (error) => {
          this.setMessageError('Error', error.statusText);
        }
      );
    }
  }


  protected isValidCategory(): boolean {

    if (!this.dataCategory.name || this.dataCategory.name.length === 0) {
      this.setMessageError('Error ', 'Ingresa el nombre de la Categoría');
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
