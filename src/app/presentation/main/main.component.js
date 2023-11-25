"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var link_1 = require("../../data/model/link");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var messaging_service_1 = require("../../data/services/messaging.service");
var auth_service_1 = require("../../data/services/auth.service");
var roles_manager_1 = require("../../data/managers/roles.manager");
var base_component_1 = require("../base-component/base-component");
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var cuenca_verde_service_1 = require("../../data/services/cuenca-verde.service");
var tasks_manager_1 = require("../../data/managers/tasks.manager");
var MainComponent = (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(authService, messagingService, router, tasksManager, platformLocation, proceduresManager, rolesManager, cuencaServicios) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.authService = authService;
        _this.messagingService = messagingService;
        _this.router = router;
        _this.tasksManager = tasksManager;
        _this.platformLocation = platformLocation;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        _this.cuencaServicios = cuencaServicios;
        return _this;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSearch = true;
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.rolesManager.searchUserRoles().then(function () {
            _this.setUpLocationChangeListener();
            _this.subscribeToBus();
            _this.getUserRoles(_this);
            _this.getProfile();
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (event.url) {
                    _this.showSearch = !event.url.includes('/search');
                }
            }
        });
        this.getUserIdOneSignal();
    };
    MainComponent.prototype.ngAfterViewInit = function () {
        var component = this;
        this.messagingService.publish(new messaging_service_1.BusMessage('onMainComponentReady', function (query) {
            component.query = query;
        }));
    };
    MainComponent.prototype.ngOnDestroy = function () {
        this.messagingServiceSubscription.unsubscribe();
    };
    MainComponent.prototype.onGotRoles = function () {
        this.setUpLinks();
    };
    MainComponent.prototype.getState = function (outlet) {
        return outlet.activatedRouteData.state;
    };
    MainComponent.prototype.subscribeToBus = function () {
        var _this = this;
        this.messagingServiceSubscription = this.messagingService.getObservable().subscribe(function (message) {
            switch (message.getChannel()) {
                case 'onRouteChanged':
                    _this.setCurrentLink();
                    break;
            }
        });
    };
    MainComponent.prototype.setUpLinks = function () {
        var component = this;
        var links = [];
        links.push(new link_1.Link('dashboard', 'Dashboard', 'dashboard'));
        if (!this.isSuperAdmin) {
            links.push(new link_1.Link('procedures', 'Procedimientos', 'procedures'));
            links.push(new link_1.Link('tasks', 'Tareas', 'task'));
            links.push(new link_1.Link('historial-tareas', 'Historial de Tareas', 'task'));
        }
        if (this.isSuperAdmin) {
            links.push(new link_1.Link('list-user', 'Lista de Usuarios', 'listUser')); //// Registro de Usuarios
            links.push(new link_1.Link('list-category', 'Lista de Categorías', 'listCategory')); //// Registro de Categorias de Conrtatistas
            links.push(new link_1.Link('list-programs', 'Lista de Programas', 'listUser')); //// Registro de Programas
            links.push(new link_1.Link('list-projects', 'Lista de Proyectos', 'listUser')); //// Registro de Programas
            links.push(new link_1.Link('list-materials', 'Lista de  Materiales', 'listUser')); //// Registro de Materiales
            links.push(new link_1.Link('list-actions', 'Lista de  Acciones', 'listUser')); //// Registro de Acciones
        }
        if (this.isCoordinador) {
            links.push(new link_1.Link('tareas-ejecucion', 'Tareas de Ejecución', 'task'));
        }
        if (this.isCoordinador || this.isComunicaciones) {
            links.push(new link_1.Link('pqrs', 'PQRS', 'pqrs'));
        }
        if (!this.isSuperAdmin) {
            links.push(new link_1.Link('search', 'Búsqueda', 'search'));
        }
        if (this.isCoordinador || this.isCoordinadorGuardacuenca) {
            links.push(new link_1.Link('guarda-cuencas', 'Guardacuencas', 'guardacuencas'));
        }
        if (this.isCoordinador || this.isGerencia) {
            links.push(new link_1.Link('budgets', 'Presupuestos', 'budget'));
        }
        if (this.isCoordinador) {
            links.push(new link_1.Link('pools-of-contracts', 'Bolsa Presupuestal', 'pools-of-contracts'));
        }
        if (this.isJuridico) {
            links.push(new link_1.Link('contractors', 'Contratistas', 'worker-construct'));
        }
        if (this.isCoordinador || this.isSeguimiento) {
            links.push(new link_1.Link('list-predios', 'Predio Potencial', 'potencial-predio'));
        }
        if (this.isDireccion) {
            links.push(new link_1.Link('comando', 'Cuadro de Control', 'control-panel'));
        }
        if (this.isCoordinador || this.isCoordinadorGuardacuenca) {
            links.push(new link_1.Link('calendar', 'Calendario de Monitoreos', 'calendar'));
        }
        if (!this.isSuperAdmin) {
            links.push(new link_1.Link('reports', 'Reportes', 'reports'));
        }
        this.links = links;
        component.selectedLink = links[0];
        this.setCurrentLink();
    };
    MainComponent.prototype.setCurrentLink = function () {
        var component = this;
        this.links.forEach(function (link) {
            if (component.router.url.includes(link.route)) {
                component.selectedLink = link;
                component.showSearch = link.route !== 'search';
            }
        });
    };
    MainComponent.prototype.linkClick = function (link) {
        this.selectedLink = link;
        this.closeNav();
    };
    MainComponent.prototype.openNav = function () {
        document.getElementById('sideNav').style.width = '270px';
        document.getElementById('main').style.marginLeft = '270px';
        document.getElementById('myCanvasNav').style.width = '100%';
        document.getElementById('myCanvasNav').style.opacity = '0.8';
        document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
    };
    MainComponent.prototype.closeNav = function () {
        document.getElementById('sideNav').style.width = '0';
        document.getElementById('main').style.marginLeft = '0';
        document.body.style.backgroundColor = 'white';
        document.getElementById('myCanvasNav').style.width = '0%';
        document.getElementById('myCanvasNav').style.opacity = '0';
    };
    MainComponent.prototype.getProfile = function () {
        var _this = this;
        this.cuencaServicios.getProfile()
            .then(function (response) {
            _this.profile = response[0];
        });
    };
    MainComponent.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        this.platformLocation.onPopState(function () {
            _this.setCurrentLink();
        });
    };
    MainComponent.prototype.logOutClick = function () {
        this.authService.logOut()
            .then(function () {
            location.reload();
        }, function (reason) {
            console.log(reason);
        });
    };
    MainComponent.prototype.onSearch = function (value) {
        this.query = value;
        this.messagingService.publish(new messaging_service_1.BusMessage('onSearchTerm', value));
    };
    MainComponent.prototype.onKeyPress = function (event) {
        if (event.keyCode === 13) {
            var link = ['/app/search/' + this.query];
            this.router.navigate(link);
        }
    };
    // ONE SIGNAL
    /////Servicio OneSignal
    MainComponent.prototype.servOneSignal = function () {
        var componente = this;
        this.tasksManager.servOneSignal(this.ID_OneSignal)
            .then(function (response) {
            /// console.log('Enviado OneSignal');
        });
    };
    MainComponent.prototype.getUserIdOneSignal = function () {
        var componente = this;
        OneSignal.push(function () {
            OneSignal.init({
                appId: '2a42d1b4-c963-4bae-a93d-916dbff0b2d4'
            });
            OneSignal.getUserId(function (userId) {
                componente.ID_OneSignal = userId;
                if (componente.ID_OneSignal) {
                    componente.servOneSignal();
                }
                console.log('OneSignal User ID:', userId);
                // console.log('Hola');
                // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
            });
            OneSignal.on('subscriptionChange', function (isSubscribed) {
                componente.getUserIdOneSignal();
            });
        });
    };
    return MainComponent;
}(base_component_1.BaseComponent));
MainComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-main',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.css']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        messaging_service_1.MessagingService,
        router_1.Router,
        tasks_manager_1.TasksManager,
        common_1.PlatformLocation,
        procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager,
        cuenca_verde_service_1.CuencaVerdeService])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map