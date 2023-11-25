"use strict";
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
var router_1 = require("@angular/router");
var log_in_component_1 = require("../presentation/log-in/log-in.component");
var auth_guard_service_1 = require("../data/services/auth-guard.service");
var procedures_component_1 = require("../presentation/procedures/view-procedures/procedures.component");
var reports_component_1 = require("../presentation/reports/reports.component");
var create_task_component_1 = require("../presentation/tasks/create-task/create-task.component");
var base_component_1 = require("../presentation/base-component/base-component");
var create_task_widget_component_1 = require("../presentation/widgets/create-task/create-task-widget.component");
var tasks_component_1 = require("../presentation/tasks/view-tasks/tasks.component");
var guarda_cuencas_component_1 = require("../presentation/guarda-cuencas/guarda-cuencas.component");
var map_component_1 = require("../presentation/map/map.component");
var view_procedure_1 = require("../presentation/procedures/view-procedure/view-procedure");
var main_component_1 = require("../presentation/main/main.component");
var coordinations_dashboard_component_1 = require("../presentation/dashboard/coordinations/coordinations-dashboard.component");
var edit_task_component_1 = require("../presentation/tasks/edit-task/edit-task.component");
var view_task_component_1 = require("../presentation/tasks/view-task/view-task.component");
var survey_component_1 = require("../presentation/forms/survey/survey.component");
var budget_component_1 = require("../presentation/budget/view-budgets/budget.component");
var predio_potencial_component_1 = require("../presentation/predio-potencial/create-predio/predio-potencial.component");
var view_budget_component_1 = require("../presentation/budget/view-budget/view-budget.component");
var minuta_component_1 = require("../presentation/forms/minuta/minuta.component");
var pools_of_contracts_component_1 = require("../presentation/pool-of-contracts/view-pools-of-contracts/pools-of-contracts.component");
var edit_pool_of_contracts_component_1 = require("../presentation/pool-of-contracts/edit-pool-of-contracts/edit-pool-of-contracts.component");
var create_procedure_component_1 = require("../presentation/procedures/create-procedure/create-procedure.component");
var edit_procedure_component_1 = require("../presentation/procedures/edit-procedure/edit-procedure.component");
var contractors_component_1 = require("../presentation/contractors/views-contractors/contractors.component");
var create_contractors_component_1 = require("../presentation/contractors/create-contractor/create-contractors.component");
var edit_contractors_component_1 = require("../presentation/contractors/edit-contractor/edit-contractors.component");
var create_pool_of_contracts_component_1 = require("../presentation/pool-of-contracts/create-pool-of-contracts/create-pool-of-contracts.component");
var informe_medicion_component_1 = require("../presentation/reports/informe-medicion/informe-medicion.component");
var informe_edicion_mapa_sig_component_1 = require("../presentation/reports/informe-edicion-mapa-sig/informe-edicion-mapa-sig.component");
var informe_verificacion_medicion_component_1 = require("../presentation/reports/informe-verificacion-medicion/informe-verificacion-medicion.component");
var informe_verificacion_edicion_mapa_sig_1 = require("../presentation/reports/informe-verificacion-edicion-mapa-sig/informe-verificacion-edicion-mapa-sig");
var informe_ejecucion_component_1 = require("../presentation/reports/informe-ejecucion/informe-ejecucion.component");
var informe_sig_final_component_1 = require("../presentation/reports/informe-sig-final/informe-sig-final.component");
var calendar_component_1 = require("../presentation/calendar/view-calendar/calendar.component");
var view_contractors_component_1 = require("../presentation/contractors/view-contractor/view-contractors.component");
var formato_stard_1 = require("../presentation/forms/formato-stard/formato-stard");
var sistema_individual_component_1 = require("../presentation/forms/sistema-individual/sistema-individual.component");
var material_vegetal_component_1 = require("../presentation/forms/material-vegetal/material-vegetal.component");
var seguimiento_predial_component_1 = require("../presentation/forms/seguimiento-predial/seguimiento-predial.component");
var control_mantenimientos_component_1 = require("../presentation/forms/contol-mantenimientos/control-mantenimientos.component");
var evaluacion_proveedores_compponent_1 = require("../presentation/forms/evaluacion-proveedores/evaluacion-proveedores.compponent");
var views_comando_component_1 = require("../presentation/cuadro-comando/view-cuadro/views-comando.component");
var create_aporte_component_1 = require("../presentation/cuadro-comando/create-aporte/create-aporte.component");
var edit_aporte_component_1 = require("../presentation/cuadro-comando/edit-aporte/edit-aporte.component");
var traslate_aporte_component_1 = require("../presentation/cuadro-comando/traslate-aporte/traslate-aporte.component");
var search_component_1 = require("../presentation/search/search.component");
var predio_component_1 = require("../presentation/predio/predio.component");
var supplier_evaluation_component_1 = require("../presentation/forms/supplier-evaluation/supplier-evaluation.component");
var view_pqrs_component_1 = require("../presentation/pqrs/view-pqrs/view-pqrs.component");
var create_pqrs_component_1 = require("../presentation/pqrs/create-pqrs/create-pqrs.component");
var pqrs_component_1 = require("../presentation/pqrs/pqrs-list/pqrs.component");
var view_pool_of_contracts_component_1 = require("../presentation/pool-of-contracts/view-pool-of-contracts/view-pool-of-contracts.component");
var view_monitoreo_component_1 = require("../presentation/monitoreos/view-monitoreo/view-monitoreo.component");
var carta_intenci_n_component_1 = require("../presentation/forms/carta-intencion/carta-intenci\u00F3n.component");
var view_search_predio_component_1 = require("../presentation/search/view-predio/view-search-predio.component");
var create_calendar_component_1 = require("../presentation/calendar/create-calendar/create-calendar.component");
var selected_calendar_component_1 = require("../presentation/calendar/selected-calendar/selected-calendar.component");
var tareas_ejecucion_component_1 = require("../presentation/tareas-ejecucion/view-tareas-ejecucion/tareas-ejecucion.component");
var view_selected_ejecucion_component_1 = require("../presentation/tareas-ejecucion/view-selected-ejecucion/view-selected-ejecucion.component");
var list_predios_component_1 = require("../presentation/predio-potencial/list-predios/list-predios.component");
var view_potencial_component_1 = require("../presentation/predio-potencial/view-predio/view-potencial.component");
var view_task_intention_component_1 = require("../presentation/tasks/view-task-intention/view-task-intention.component");
var create_tarea_ejecucion_component_1 = require("../presentation/tareas-ejecucion/create-tarea-ejecucion/create-tarea-ejecucion.component");
var history_task_component_1 = require("../presentation/tasks/history-task/history-task.component");
var register_user_component_1 = require("../presentation/super-admin/Users/register-user/register-user.component");
var list_user_component_1 = require("../presentation/super-admin/Users/list-user/list-user.component");
var register_category_component_1 = require("../presentation/super-admin/Categories/register-category/register-category.component");
var list_categories_component_1 = require("../presentation/super-admin/Categories/list-categories/list-categories.component");
var register_program_component_1 = require("../presentation/super-admin/Programs/register-program/register-program.component");
var list_programs_component_1 = require("../presentation/super-admin/Programs/list-programs/list-programs.component");
var register_project_component_1 = require("../presentation/super-admin/Project/register-project/register-project.component");
var list_projects_component_1 = require("../presentation/super-admin/Project/list-projects/list-projects.component");
var register_activities_component_1 = require("../presentation/super-admin/Actividades/register-activities/register-activities.component");
var register_material_component_1 = require("../presentation/super-admin/Materials/register-materials/register-material.component");
var list_materials_component_1 = require("../presentation/super-admin/Materials/list-materials/list-materials.component");
var list_actions_component_1 = require("../presentation/super-admin/Actions/list-actions/list-actions.component");
var register_action_component_1 = require("../presentation/super-admin/Actions/register-action/register-action.component");
var routes = [
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full',
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'app',
        component: main_component_1.MainComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                component: coordinations_dashboard_component_1.CoordinationsDashboardComponent,
                children: [
                    {
                        path: 'procedures/:id',
                        component: procedures_component_1.ProceduresComponent
                    }
                ]
            },
            {
                path: 'guarda-cuencas',
                component: guarda_cuencas_component_1.GuardacuencasComponent,
                data: {
                    state: 'guarda-cuencas'
                }
            },
            {
                path: 'reports',
                component: reports_component_1.ReportsComponent,
                data: {
                    state: 'reports'
                }
            },
            {
                path: 'reports-management',
                component: reports_management_component_1.ReportsManagementComponent,
                data: {
                    state: 'reports'
                }
            },
            {
                path: 'map/:id',
                component: map_component_1.MapComponent,
                data: {
                    state: 'map'
                }
            },
            {
                path: 'procedures',
                component: procedures_component_1.ProceduresComponent,
                data: {
                    state: 'procedures'
                }
            },
            {
                path: 'create-procedures',
                component: create_procedure_component_1.CreateProcedureComponent,
                children: [
                    {
                        path: '',
                        component: base_component_1.BaseComponent
                    },
                    {
                        path: 'create-task',
                        component: create_task_widget_component_1.CreateTaskWidgetComponent
                    }
                ],
                data: {
                    state: 'procedures'
                }
            },
            {
                path: 'view-procedures/:id',
                component: view_procedure_1.ViewProjectComponent,
                data: {
                    state: 'procedures'
                }
            },
            {
                path: 'edit-procedures/:id',
                component: edit_procedure_component_1.EditProcedureComponent,
                data: {
                    state: 'procedures'
                }
            },
            {
                path: 'tasks',
                component: tasks_component_1.TasksComponent,
                data: {
                    state: 'tasks'
                }
            },
            {
                path: 'create-tasks',
                component: create_task_component_1.CreateTaskComponent,
                data: {
                    state: 'tasks'
                }
            },
            {
                path: 'view-tasks/:id',
                component: view_task_component_1.ViewTaskComponent,
                data: {
                    state: 'tasks'
                }
            },
            {
                path: 'view-search-predio/:id',
                component: view_search_predio_component_1.ViewSearchPredioComponent,
                data: {
                    state: 'view-search-predio'
                }
            },
            {
                path: 'edit-tasks/:id',
                component: edit_task_component_1.EditTaskComponent,
                data: {
                    state: 'tasks'
                }
            },
            {
                path: 'coordinations',
                component: coordinations_dashboard_component_1.CoordinationsDashboardComponent,
                data: {
                    state: 'coordinations'
                }
            },
            {
                path: 'survey/:id',
                component: survey_component_1.SurveyComponent,
                data: {
                    state: 'survey'
                }
            },
            {
                path: 'budgets',
                component: budget_component_1.BudgetComponent,
                data: {
                    state: 'budgets'
                }
            },
            {
                path: 'budgets/:id',
                component: view_budget_component_1.ViewBudgetComponent,
                data: {
                    state: 'view-budgets'
                }
            },
            {
                path: 'predio-potencial',
                component: predio_potencial_component_1.PredioPotencialComponent,
                data: {
                    state: 'predio-potencial'
                }
            },
            {
                path: 'view-potencial/:id',
                component: view_potencial_component_1.ViewPotencialComponent,
                data: {
                    state: 'view-potencial'
                }
            },
            {
                path: 'list-predios',
                component: list_predios_component_1.ListPrediosComponent,
                data: {
                    state: 'list-predios'
                }
            },
            {
                path: 'ver-minuta/:id',
                component: minuta_component_1.MinutaComponent,
                data: {
                    state: 'ver-minuta'
                }
            },
            {
                path: 'ver-carta-intencion/:id',
                component: carta_intenci_n_component_1.CartaIntencionComponent,
                data: {
                    state: 'ver-carta-intencion'
                }
            },
            {
                path: 'tarea-carta-intencion/:id',
                component: view_task_intention_component_1.ViewTaskIntentionComponent,
                data: {
                    state: 'tarea-carta-intencion'
                }
            },
            {
                path: 'informe-medicion/:id',
                component: informe_medicion_component_1.IMedicionComponent,
                data: {
                    state: 'informe-medicion'
                }
            },
            {
                path: 'informe-verificacion-medicion/:id',
                component: informe_verificacion_medicion_component_1.InformeVerificacionMedicionComponent,
                data: {
                    state: 'informe-verificacion-medicion'
                }
            },
            {
                path: 'informe-verificacion-edicion/:id',
                component: informe_verificacion_edicion_mapa_sig_1.IVerifEdicionComponent,
                data: {
                    state: 'informe-verificacion-edicion'
                }
            },
            {
                path: 'informe-ejecucion/:id',
                component: informe_ejecucion_component_1.InformeEjecucionComponent,
                data: {
                    state: 'informe-ejecucion'
                }
            },
            {
                path: 'informe-edicion/:id',
                component: informe_edicion_mapa_sig_component_1.IEdicionSigComponent,
                data: {
                    state: 'informe-medicion'
                }
            },
            {
                path: 'informe-final-sig/:id',
                component: informe_sig_final_component_1.ISigFinalComponent,
                data: {
                    state: 'informe-final-sig'
                }
            },
            {
                path: 'calendar',
                component: calendar_component_1.CuencaCalendarComponent,
                data: {
                    state: 'cuenca-calendar'
                }
            },
            {
                path: 'selected-calendar/:id',
                component: selected_calendar_component_1.SelectedCalendarComponent,
                data: {
                    state: 'cuenca-calendar-selected'
                }
            },
            {
                path: 'create-calendar/:fecha',
                component: create_calendar_component_1.CreateCalendarComponent,
                data: {
                    state: 'cuenca-calendar-crear'
                }
            },
            {
                path: 'pools-of-contracts',
                component: pools_of_contracts_component_1.PoolsOfContractsComponent,
                data: {
                    state: 'pools-of-contracts'
                }
            },
            {
                path: 'create-pools-of-contracts',
                component: create_pool_of_contracts_component_1.CreatePoolOfContractsComponent,
                data: {
                    state: 'pools-of-contracts'
                }
            },
            {
                path: 'edit-pools-of-contracts/:id',
                component: edit_pool_of_contracts_component_1.EditPoolOfContractsComponent,
                data: {
                    state: 'pools-of-contracts'
                }
            },
            {
                path: 'view-pools-of-contracts/:id',
                component: view_pool_of_contracts_component_1.ViewPoolOfContractsComponent,
                data: {
                    state: 'pools-of-contracts'
                }
            },
            {
                path: 'contractors',
                component: contractors_component_1.ContractorsComponent,
                data: {
                    state: 'contractors'
                }
            },
            {
                path: 'create-contractors',
                component: create_contractors_component_1.CreateContractorComponent,
                data: {
                    state: 'create-contractors'
                }
            },
            {
                path: 'edit-contractors/:id',
                component: edit_contractors_component_1.EditContractorComponent,
                data: {
                    state: 'edit-contractors'
                }
            },
            {
                path: 'view-contractor/:id',
                component: view_contractors_component_1.ContractorsViewComponent,
                data: {
                    state: 'view-contractor'
                }
            },
            {
                path: 'formato-stard/:id',
                component: formato_stard_1.FormatoStardComponent,
                data: {
                    state: 'formato-stard'
                }
            },
            {
                path: 'sistema-individual/:id',
                component: sistema_individual_component_1.SistemaIndividualComponent,
                data: {
                    state: 'sistema-individual'
                }
            },
            {
                path: 'material-vegetal/:id',
                component: material_vegetal_component_1.MaterialVegetalComponent,
                data: {
                    state: 'material-vegetal'
                }
            },
            {
                path: 'seguimiento-predial/:id',
                component: seguimiento_predial_component_1.SeguimientoPredialComponent,
                data: {
                    state: 'seguimiento-predial'
                }
            },
            {
                path: 'control-mantenimientos/:id',
                component: control_mantenimientos_component_1.ControlMantenimientosComponent,
                data: {
                    state: 'control-mantenimientos'
                }
            },
            {
                path: 'evaluacion-proveedores/:id',
                component: evaluacion_proveedores_compponent_1.EvaluacionProveedoresComponent,
                data: {
                    state: 'evaluacion-proveedores'
                }
            },
            {
                path: 'evaluacion-proveedores/:id',
                component: evaluacion_proveedores_compponent_1.EvaluacionProveedoresComponent,
                data: {
                    state: 'evaluacion-proveedores'
                }
            },
            {
                path: 'comando',
                component: views_comando_component_1.ViewsComandoComponent,
                data: {
                    state: 'comando'
                }
            },
            {
                path: 'create-aporte',
                component: create_aporte_component_1.CreateAporteComponent,
                data: {
                    state: 'create-aporte'
                }
            },
            {
                path: 'edit-aporte/:id',
                component: edit_aporte_component_1.EditAporteComponent,
                data: {
                    state: 'edit-aporte'
                }
            },
            {
                path: 'traslate-aporte/:id',
                component: traslate_aporte_component_1.TraslateAporteComponent,
                data: {
                    state: 'traslate-aporte'
                }
            },
            {
                path: 'search',
                component: search_component_1.SearchComponent,
                data: {
                    state: 'search'
                }
            },
            {
                path: 'search/:query',
                component: search_component_1.SearchComponent,
                data: {
                    state: 'search'
                }
            },
            {
                path: 'predio/:id',
                component: predio_component_1.PredioComponent,
                data: {
                    state: 'predio'
                }
            },
            {
                path: 'forms/supplier-evaluation/:id',
                component: supplier_evaluation_component_1.SupplierEvaluationComponent,
                data: {
                    state: 'forms'
                }
            },
            {
                path: 'pqrs',
                component: pqrs_component_1.PqrsComponent,
                data: {
                    state: 'pqrsList'
                }
            },
            {
                path: 'create-pqrs',
                component: create_pqrs_component_1.CreatePqrsComponent,
                data: {
                    state: 'pqrsList'
                }
            },
            {
                path: 'view-pqrs/:id',
                component: view_pqrs_component_1.ViewPqrsComponent,
                data: {
                    state: 'pqrsList'
                }
            },
            {
                path: 'view-monitoreos/:id',
                component: view_monitoreo_component_1.ViewMonitoreoComponent,
                data: {
                    state: 'monitoreos'
                }
            },
            {
                path: 'tareas-ejecucion',
                component: tareas_ejecucion_component_1.TareasEjecucionComponent,
                data: {
                    state: 'tareas-ejecucion'
                }
            },
            {
                path: 'historial-tareas',
                component: history_task_component_1.HistoryTaskComponent,
                data: {
                    state: 'historial-tareas'
                }
            },
            {
                path: 'view-tarea-ejecucion/:id',
                component: view_selected_ejecucion_component_1.ViewSelectedEjecucionComponent,
                data: {
                    state: 'view-tarea-ejecucion'
                }
            },
            {
                path: 'create-tarea-ejecucion',
                component: create_tarea_ejecucion_component_1.CreateTareaEjecucionComponent,
                data: {
                    state: 'create-tarea-ejecucion'
                }
            },
            ////// SUPER ADMINISTRATOR
            {
                path: 'register-user',
                component: register_user_component_1.RegisterUserComponent,
                data: {
                    state: 'register-user'
                }
            },
            {
                path: 'list-user',
                component: list_user_component_1.ListUserComponent,
                data: {
                    state: 'list-user'
                }
            },
            {
                path: 'list-category',
                component: list_categories_component_1.ListCategoriesComponent,
                data: {
                    state: 'list-category'
                }
            },
            {
                path: 'register-category',
                component: register_category_component_1.RegisterCategoryComponent,
                data: {
                    state: 'register-category'
                }
            },
            {
                path: 'register-material',
                component: register_material_component_1.RegisterMaterialComponent,
                data: {
                    state: 'register-material'
                }
            },
            {
                path: 'list-materials',
                component: list_materials_component_1.ListMaterialsComponent,
                data: {
                    state: 'list-materials'
                }
            },
            {
                path: 'register-program',
                component: register_program_component_1.RegisterProgramComponent,
                data: {
                    state: 'register-program'
                }
            },
            {
                path: 'list-programs',
                component: list_programs_component_1.ListProgramsComponent,
                data: {
                    state: 'list-programs'
                }
            },
            {
                path: 'register-projects/:id',
                component: register_project_component_1.RegisterProjectComponent,
                data: {
                    state: 'register-projects'
                }
            },
            {
                path: 'list-projects',
                component: list_projects_component_1.ListProjectsComponent,
                data: {
                    state: 'list-projects'
                }
            },
            {
                path: 'register-activities/:id',
                component: register_activities_component_1.RegisterActivitiesComponent,
                data: {
                    state: 'register-activities'
                }
            },
            {
                path: 'list-actions',
                component: list_actions_component_1.ListActionsComponent,
                data: {
                    state: 'list-actions'
                }
            },
            {
                path: 'register-action',
                component: register_action_component_1.RegisterActionComponent,
                data: {
                    state: 'register-action'
                }
            }
        ]
    },
    {
        path: 'login',
        component: log_in_component_1.LogInComponent,
        data: {
            state: 'login'
        }
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule(router) {
        var _this = this;
        this.router = router;
        this.router.errorHandler = function (error) {
            var link = ['/app'];
            _this.router.navigate(link);
        };
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map