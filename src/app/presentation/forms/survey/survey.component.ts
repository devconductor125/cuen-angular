import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import Property = propertyInterface.Property;
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Globals} from '../../../../globals';
import Contact = propertyInterface.Contact;

declare var $: any;


@Component({
  selector: 'cuenca-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent extends BaseComponent implements OnInit {
  public idPredio: String;
  public formatSurvey: String = '1';
  public disabledFormat1: Boolean = true;
  public disabledFormat2: Boolean = false;

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              protected activatedRoute: ActivatedRoute,
              private globals: Globals,
              private cd: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        this.idPredio = idString;
      });
  }

  format(formato: String) {
    this.formatSurvey = formato;

    switch (formato) {
      case '1':
        this.disabledFormat1 = true;
        this.disabledFormat2 = false;
        break;
      case '2':
        this.disabledFormat1 = false;
        this.disabledFormat2 = true;
        break;
      default:
    }

  }

}
