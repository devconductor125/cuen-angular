import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {Categories} from '../../../../data/model/categories';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';


@Component({
  selector: 'cuenca-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})

export class ListCategoriesComponent extends BaseComponent implements OnInit {

  public listCategories: Array<Categories> = [];
  constructor(protected proceduresManager: ProceduresManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              private cuencaVeServices: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }
  ngOnInit(): void {
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getAllCategories();
  }
  public getAllCategories(): void {

    this.cuencaVeServices.getAllCategories()
      .then((categorias: any) => {
        this.listCategories = categorias;
      });
  }
}
