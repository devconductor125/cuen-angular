import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Link} from '../../data/model/link';
import {NavigationStart, Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {BusMessage, MessagingService} from '../../data/services/messaging.service';
import {AuthService} from '../../data/services/auth.service';
import {RolesManager} from '../../data/managers/roles.manager';
import {BaseComponent} from '../base-component/base-component';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {CuencaVerdeService} from '../../data/services/cuenca-verde.service';
import {TasksManager} from '../../data/managers/tasks.manager';

declare var window: any;
declare var OneSignal: any;

@Component({
  selector: 'cuenca-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  public links: Link[];
  public selectedLink: Link;
  protected messagingServiceSubscription: Subscription;
  public profile: any;
  public query: String;
  public showSearch: boolean;

  public ID_OneSignal: string;

  constructor(private authService: AuthService,
              private messagingService: MessagingService,
              private router: Router,
              protected tasksManager: TasksManager,
              private platformLocation: PlatformLocation,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              public cuencaServicios: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.showSearch = true;
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.rolesManager.searchUserRoles().then(() => {
      this.setUpLocationChangeListener();
      this.subscribeToBus();
      this.getUserRoles(this);
      this.getProfile();
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url) {
          this.showSearch = !event.url.includes('/search');
        }
      }
    });

    this.getUserIdOneSignal();
  }

  ngAfterViewInit(): void {
    const component = this;
    this.messagingService.publish(new BusMessage('onMainComponentReady', function (query: string) {
      component.query = query;
    }));
  }

  ngOnDestroy(): void {
    this.messagingServiceSubscription.unsubscribe();
  }

  protected onGotRoles(): void {
    this.setUpLinks();
  }

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  subscribeToBus(): void {
    this.messagingServiceSubscription = this.messagingService.getObservable().subscribe(message => {
      switch (message.getChannel()) {
        case 'onRouteChanged':
          this.setCurrentLink();
          this.query = message.getData();
          break;
      }
    });
  }

  private setUpLinks() {
    const component = this;
    const links = [];

    // new links
    if (this.isSuperAdmin) {
      links.push(new Link('list-user', 'Lista de Usuarios', 'listUser'));
      links.push(new Link('list-contributor', 'Lista contribuyentes', 'listUser'));
      links.push(new Link('list-programs', 'Lista de Programas', 'listUser'));
      links.push(new Link('list-projects', 'Lista de Proyectos', 'listUser'));
      links.push(new Link('list-actions', 'Lista de  Acciones', 'listUser'));
      links.push(new Link('loadShapeProperties', 'Capa de Gestión Predial', 'upload'));
      links.push(new Link('list-category', 'Lista de categorías de contratista', 'listCategory'));
      links.push(new Link('actions-financial', 'Acciones financiero', 'listCategory'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('seed-capital', 'Capital semilla', 'task'));
    }
    if (this.isAdministrativo) {
      links.push(new Link('list-predios', 'Predio Potencial', 'potencial-predio'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('pqrs', 'PQRS', 'pqrs'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isCoordinadorGuardacuenca) {
      links.push(new Link('list-predios', 'Predio Potencial', 'potencial-predio'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('guarda-cuencas', 'Cuota Guardacuencas', 'guardacuencas'));
      links.push(new Link('pqrs', 'PQRS', 'pqrs'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isGuardaCuenca) {
      links.push(new Link('list-predios', 'Predio Potencial', 'potencial-predio'));
      links.push(new Link('guarda-cuencas', 'Cuota Guardacuencas', 'guardacuencas'));
      links.push(new Link('load-base-procesos-erosivos', 'Cargar Base Procesos Erosivos', 'upload'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('pqrs', 'PQRS', 'pqrs'));
      
    }
    if (this.isSig) {
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('load-base-procesos-erosivos', 'Cargar Base Procesos Erosivos', 'upload'));
      links.push(new Link('load-base-fuentes-hidricas', 'Cargar Base Fuentes Hídricas', 'upload'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('load-predio-base', 'Cargar Base de Predios PSA', 'potencial-predio'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isSeguimiento) {
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isJuridico) {
      links.push(new Link('list-predios', 'Predio Potencial', 'potencial-predio'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('contractors', 'Contratistas', 'worker-construct'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isCoordinadorRestauracion) {
      links.push(new Link('comando', 'Cuadro de Mando y control', 'task'));
      links.push(new Link('list-predios', 'Predio Potencial', 'potencial-predio'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('budgets', 'Presupuestos', 'budget'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      links.push(new Link('view-list-details-budget', 'Financiero', 'task'));
      links.push(new Link('report-management', 'Informe de Gestión', 'task'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('events', 'Cosultar eventos', 'task'));
    }
    if (this.isCoordinadorRecursoHidrico) {
      links.push(new Link('comando', 'Cuadro de Mando y control', 'task'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));//georgi 68
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('load-base-procesos-erosivos', 'Cargar Base Procesos Erosivos', 'upload'));
      links.push(new Link('load-base-fuentes-hidricas', 'Cargar Base Fuentes Hídricas', 'upload'));
      links.push(new Link('budgets', 'Presupuestos', 'budget'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      links.push(new Link('view-list-details-budget', 'Financiero', 'task'));
      links.push(new Link('report-management', 'Informe de Gestión', 'task'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('events', 'Cosultar eventos', 'task'));
    }

    if (this.isFinanciero) {
      links.push(new Link('comando', 'Cuadro de Mando y control', 'task'));
      links.push(new Link('view-list-details-budget', 'Financiero', 'task'));
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('load-reporte-gastos', 'Cargar Reporte Centro de Costos', 'task'));
      links.push(new Link('income', 'Ingresos', 'task'));
    }
    if (this.isDireccion) {
      links.push(new Link('comando', 'Cuadro de Mando y control', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('view-list-details-budget', 'Financiero', 'task'));
      links.push(new Link('pqrs', 'PQRS', 'pqrs'));
      links.push(new Link('report-management', 'Informe de Gestión', 'task'));
      links.push(new Link('report-iph', 'IPH', 'task'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('seed-capital', 'Capital semilla', 'task'));
    }
    if (this.isComunicaciones) {
      links.push(new Link('comando', 'Cuadro de Mando y control', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      links.push(new Link('view-list-details-budget', 'Financiero', 'task'));
      links.push(new Link('pqrs', 'PQRS', 'pqrs'));
      links.push(new Link('report-management', 'Informe de Gestión', 'task'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('events', 'Cosultar eventos', 'task'));
    }
    if (this.isTencnico) {
      links.push(new Link('load-base-fuentes-hidricas', 'Cargar Base Fuentes Hídricas', 'upload'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isApoyoCoordinadorRestauracion) {
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('budgets', 'Presupuestos', 'budget'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isApoyoCoordinadorRecursoHidrico) {
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('load-base-procesos-erosivos', 'Cargar Base Procesos Erosivos', 'upload'));
      links.push(new Link('load-base-fuentes-hidricas', 'Cargar Base Fuentes Hídricas', 'upload'));
      links.push(new Link('budgets', 'Presupuestos', 'budget'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }
    if (this.isApoyoComunicaciones) {
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
      links.push(new Link('properties-list', 'Lista Predios', 'task'));
      links.push(new Link('procedures', 'Procedimientos', 'procedures'));
      links.push(new Link('pools-of-contracts', 'Procesos contractuales', 'pools-of-contracts'));
      links.push(new Link('pqrs', 'PQRS', 'pqrs'));
      links.push(new Link('historial-tareas', 'Historial de Tareas', 'task'));
      links.push(new Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
    }

    links.push(new Link('tasks', 'Tareas', 'task'));

    this.links = links;
    component.selectedLink = links[0];
    this.setCurrentLink();
  }

  private setCurrentLink() {
    const component = this;
    this.links.forEach(function (link: Link) {
      if (component.router.url.includes(link.route)) {
        component.selectedLink = link;
        component.showSearch = link.route !== 'search';
      }
    });
  }

  linkClick(link: Link): void {
    this.selectedLink = link;
    this.closeNav();
  }

  openNav() {
    document.getElementById('sideNav').style.width = '270px';
    document.getElementById('main').style.marginLeft = '270px';
    document.getElementById('myCanvasNav').style.width = '100%';
    document.getElementById('myCanvasNav').style.opacity = '0.8';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('sideNav').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    document.body.style.backgroundColor = 'white';
    document.getElementById('myCanvasNav').style.width = '0%';
    document.getElementById('myCanvasNav').style.opacity = '0';
  }

  getProfile(): void {
    this.cuencaServicios.getProfile()
      .then((response: Array<JSON>) => {
        console.log(response)
        this.profile = response[0];
      });
  }

  private setUpLocationChangeListener() {
    this.platformLocation.onPopState(() => {
      this.setCurrentLink();
    });
  }

  logOutClick(): void {
    this.authService.logOut()
      .then(() => {
        location.reload();
      }, function (reason) {
        console.log(reason);
      });
  }

  onSearch(value: String): void {
    this.query = value;
    this.messagingService.publish(new BusMessage('onSearchTerm', value));
  }

  onKeyPress(event: any): void {
    if (event.keyCode === 13) {
      const link = ['/app/search/' + this.query];
      this.router.navigate(link);
    }
  }

  // ONE SIGNAL
  /////Servicio OneSignal
  public servOneSignal(): void {
    const componente = this;
    this.tasksManager.servOneSignal(this.ID_OneSignal)
      .then((response: any) => {
      });
  }

  getUserIdOneSignal(): void {

    const componente = this;
    OneSignal.push(function () {
      OneSignal.init({
        appId: '2a42d1b4-c963-4bae-a93d-916dbff0b2d4'
      });

      OneSignal.getUserId(function (userId: any) {
        componente.ID_OneSignal = userId;
        if (componente.ID_OneSignal) {
          componente.servOneSignal();
        }
        console.log('OneSignal User ID:', userId);
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
      });

      OneSignal.on('subscriptionChange', function (isSubscribed: any) {
        componente.getUserIdOneSignal();
      });
    });
  }
}
