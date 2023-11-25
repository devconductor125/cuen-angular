"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("../presentation/app/app.component");
var map_component_1 = require("../presentation/map/map.component");
var messaging_service_1 = require("../data/services/messaging.service");
var geo_json_service_1 = require("../data/services/geo-json.service");
var byte_array_utils_1 = require("../data/utils/byte-array.utils");
var procedures_manager_1 = require("../data/managers/procedures.manager");
var base_component_1 = require("../presentation/base-component/base-component");
var auth_service_1 = require("../data/services/auth.service");
var cuenca_verde_service_1 = require("../data/services/cuenca-verde.service");
var log_in_component_1 = require("../presentation/log-in/log-in.component");
var auth_guard_service_1 = require("../data/services/auth-guard.service");
var http_1 = require("@angular/http");
var procedures_component_1 = require("../presentation/procedures/view-procedures/procedures.component");
var reports_component_1 = require("../presentation/reports/reports.component");
var create_task_component_1 = require("../presentation/tasks/create-task/create-task.component");
var alerts_list_component_1 = require("../presentation/widgets/alerts-list/alerts-list.component");
var budget_tracker_component_1 = require("../presentation/widgets/budget-tracker/budget-tracker.component");
var create_task_widget_component_1 = require("../presentation/widgets/create-task/create-task-widget.component");
var tasks_component_1 = require("../presentation/tasks/view-tasks/tasks.component");
var drag_and_drop_component_1 = require("../presentation/widgets/drag-and-drop/drag-and-drop.component");
var drag_and_drop_directive_1 = require("../presentation/widgets/drag-and-drop/directives/drag-and-drop.directive");
var guarda_cuencas_component_1 = require("../presentation/guarda-cuencas/guarda-cuencas.component");
var shape_files_uploader_1 = require("../presentation/shape-file-uploader/shape-files-uploader");
var animations_1 = require("@angular/platform-browser/animations");
var view_procedure_1 = require("../presentation/procedures/view-procedure/view-procedure");
var coordinations_dashboard_component_1 = require("../presentation/dashboard/coordinations/coordinations-dashboard.component");
var main_component_1 = require("../presentation/main/main.component");
var session_manager_1 = require("../data/managers/session.manager");
var tasks_manager_1 = require("../data/managers/tasks.manager");
var roles_manager_1 = require("../data/managers/roles.manager");
var edit_task_component_1 = require("../presentation/tasks/edit-task/edit-task.component");
var core_1 = require("@angular/core");
var view_task_component_1 = require("../presentation/tasks/view-task/view-task.component");
var survey_component_1 = require("../presentation/forms/survey/survey.component");
var budget_component_1 = require("../presentation/budget/view-budgets/budget.component");
var procedures_list_component_1 = require("../presentation/widgets/procedures-list/procedures-list.component");
var view_budget_component_1 = require("../presentation/budget/view-budget/view-budget.component");
var drag_and_drop_ofac_component_1 = require("../presentation/widgets/drap-an-drop-ofac/drag-and-drop-ofac.component");
var monitoreos_component_1 = require("../presentation/monitoreos/monitoreos.component");
var minuta_component_1 = require("../presentation/forms/minuta/minuta.component");
var pool_of_contracts_manager_1 = require("../data/managers/pool-of-contracts.manager");
var create_procedure_component_1 = require("../presentation/procedures/create-procedure/create-procedure.component");
var edit_procedure_component_1 = require("../presentation/procedures/edit-procedure/edit-procedure.component");
var create_pool_of_contracts_component_1 = require("../presentation/pool-of-contracts/create-pool-of-contracts/create-pool-of-contracts.component");
var edit_pool_of_contracts_component_1 = require("../presentation/pool-of-contracts/edit-pool-of-contracts/edit-pool-of-contracts.component");
var create_contractors_component_1 = require("../presentation/contractors/create-contractor/create-contractors.component");
var contractors_component_1 = require("../presentation/contractors/views-contractors/contractors.component");
var edit_contractors_component_1 = require("../presentation/contractors/edit-contractor/edit-contractors.component");
var contractors_manager_1 = require("../data/managers/contractors.manager");
var drag_and_drop_contractor_component_1 = require("../presentation/widgets/drag-and-drop-contractor/drag-and-drop-contractor.component");
var informe_medicion_component_1 = require("../presentation/reports/informe-medicion/informe-medicion.component");
var informe_edicion_mapa_sig_component_1 = require("../presentation/reports/informe-edicion-mapa-sig/informe-edicion-mapa-sig.component");
var informe_verificacion_medicion_component_1 = require("../presentation/reports/informe-verificacion-medicion/informe-verificacion-medicion.component");
var informe_verificacion_edicion_mapa_sig_1 = require("../presentation/reports/informe-verificacion-edicion-mapa-sig/informe-verificacion-edicion-mapa-sig");
var informe_ejecucion_component_1 = require("../presentation/reports/informe-ejecucion/informe-ejecucion.component");
var informe_sig_final_component_1 = require("../presentation/reports/informe-sig-final/informe-sig-final.component");
var round_progress_component_1 = require("../presentation/widgets/circular-progress/round-progress.component");
var round_progress_service_1 = require("../presentation/widgets/circular-progress/round-progress.service");
var round_progress_ease_1 = require("../presentation/widgets/circular-progress/round-progress.ease");
var round_progress_config_1 = require("../presentation/widgets/circular-progress/round-progress.config");
var view_contractors_component_1 = require("../presentation/contractors/view-contractor/view-contractors.component");
var formato_stard_1 = require("../presentation/forms/formato-stard/formato-stard");
var sistema_individual_component_1 = require("../presentation/forms/sistema-individual/sistema-individual.component");
var material_vegetal_component_1 = require("../presentation/forms/material-vegetal/material-vegetal.component");
var seguimiento_predial_component_1 = require("../presentation/forms/seguimiento-predial/seguimiento-predial.component");
var control_mantenimientos_component_1 = require("../presentation/forms/contol-mantenimientos/control-mantenimientos.component");
var evaluacion_proveedores_compponent_1 = require("../presentation/forms/evaluacion-proveedores/evaluacion-proveedores.compponent");
var ng_fullcalendar_1 = require("ng-fullcalendar");
var mapa_calendar_component_1 = require("../presentation/mapa-calendar/mapa-calendar.component");
var views_comando_component_1 = require("../presentation/cuadro-comando/view-cuadro/views-comando.component");
var create_aporte_component_1 = require("../presentation/cuadro-comando/create-aporte/create-aporte.component");
var edit_aporte_component_1 = require("../presentation/cuadro-comando/edit-aporte/edit-aporte.component");
var traslate_aporte_component_1 = require("../presentation/cuadro-comando/traslate-aporte/traslate-aporte.component");
var metas_component_1 = require("../presentation/cuadro-comando/componente-metas/metas.component");
var especies_component_1 = require("../presentation/cuadro-comando/component-insert-especies/especies.component");
var angular_instantsearch_1 = require("angular-instantsearch");
var search_component_1 = require("../presentation/search/search.component");
var predio_component_1 = require("../presentation/predio/predio.component");
var supplier_evaluation_component_1 = require("../presentation/forms/supplier-evaluation/supplier-evaluation.component");
var view_pqrs_component_1 = require("../presentation/pqrs/view-pqrs/view-pqrs.component");
var create_pqrs_component_1 = require("../presentation/pqrs/create-pqrs/create-pqrs.component");
var pqrs_component_1 = require("../presentation/pqrs/pqrs-list/pqrs.component");
var view_pool_of_contracts_component_1 = require("../presentation/pool-of-contracts/view-pool-of-contracts/view-pool-of-contracts.component");
var view_monitoreo_component_1 = require("../presentation/monitoreos/view-monitoreo/view-monitoreo.component");
var carta_intenci_n_component_1 = require("../presentation/forms/carta-intencion/carta-intenci\u00F3n.component");
var pools_of_contracts_component_1 = require("../presentation/pool-of-contracts/view-pools-of-contracts/pools-of-contracts.component");
var ng_select_1 = require("ng-select");
var view_search_predio_component_1 = require("../presentation/search/view-predio/view-search-predio.component");
var calendar_component_1 = require("../presentation/calendar/view-calendar/calendar.component");
var create_calendar_component_1 = require("../presentation/calendar/create-calendar/create-calendar.component");
var selected_calendar_component_1 = require("../presentation/calendar/selected-calendar/selected-calendar.component");
var point_detail_component_1 = require("../presentation/calendar/point-detail/point-detail.component");
var globals_1 = require("../../globals");
var tareas_ejecucion_component_1 = require("../presentation/tareas-ejecucion/view-tareas-ejecucion/tareas-ejecucion.component");
var view_selected_ejecucion_component_1 = require("../presentation/tareas-ejecucion/view-selected-ejecucion/view-selected-ejecucion.component");
var list_predios_component_1 = require("../presentation/predio-potencial/list-predios/list-predios.component");
var predio_potencial_component_1 = require("../presentation/predio-potencial/create-predio/predio-potencial.component");
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
var project_to_program_component_1 = require("../presentation/widgets/add-project-to-program/project-to-program-component");
var list_projects_component_1 = require("../presentation/super-admin/Project/list-projects/list-projects.component");
var register_activities_component_1 = require("../presentation/super-admin/Actividades/register-activities/register-activities.component");
var activity_to_project_component_1 = require("../presentation/widgets/add-activity-to-project/activity-to-project-component");
var register_material_component_1 = require("../presentation/super-admin/Materials/register-materials/register-material.component");
var list_materials_component_1 = require("../presentation/super-admin/Materials/list-materials/list-materials.component");
var list_actions_component_1 = require("../presentation/super-admin/Actions/list-actions/list-actions.component");
var register_action_component_1 = require("../presentation/super-admin/Actions/register-action/register-action.component");
var ngx_color_picker_1 = require("ngx-color-picker");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            animations_1.BrowserAnimationsModule,
            ng_fullcalendar_1.FullCalendarModule,
            ng_select_1.SelectModule,
            angular_instantsearch_1.NgAisModule.forRoot(),
            ngx_color_picker_1.ColorPickerModule
        ],
        declarations: [
            app_component_1.AppComponent,
            main_component_1.MainComponent,
            base_component_1.BaseComponent,
            map_component_1.MapComponent,
            shape_files_uploader_1.ShapeFilesUploaderComponent,
            log_in_component_1.LogInComponent,
            procedures_component_1.ProceduresComponent,
            reports_component_1.ReportsComponent,
            create_procedure_component_1.CreateProcedureComponent,
            view_procedure_1.ViewProjectComponent,
            edit_procedure_component_1.EditProcedureComponent,
            create_task_component_1.CreateTaskComponent,
            coordinations_dashboard_component_1.CoordinationsDashboardComponent,
            alerts_list_component_1.AlertsListComponent,
            budget_tracker_component_1.BudgetTrackerComponent,
            procedures_list_component_1.ProceduresListComponent,
            create_task_widget_component_1.CreateTaskWidgetComponent,
            tasks_component_1.TasksComponent,
            guarda_cuencas_component_1.GuardacuencasComponent,
            drag_and_drop_component_1.DragAndDropComponent,
            drag_and_drop_ofac_component_1.DragAndDropOfacComponent,
            drag_and_drop_contractor_component_1.DragAndDropContractorComponent,
            drag_and_drop_directive_1.DragAndDropDirective,
            edit_task_component_1.EditTaskComponent,
            view_task_component_1.ViewTaskComponent,
            survey_component_1.SurveyComponent,
            budget_component_1.BudgetComponent,
            predio_potencial_component_1.PredioPotencialComponent,
            view_budget_component_1.ViewBudgetComponent,
            monitoreos_component_1.MonitoreosComponent,
            minuta_component_1.MinutaComponent,
            pools_of_contracts_component_1.PoolsOfContractsComponent,
            create_pool_of_contracts_component_1.CreatePoolOfContractsComponent,
            edit_pool_of_contracts_component_1.EditPoolOfContractsComponent,
            contractors_component_1.ContractorsComponent,
            create_contractors_component_1.CreateContractorComponent,
            edit_contractors_component_1.EditContractorComponent,
            informe_medicion_component_1.IMedicionComponent,
            informe_edicion_mapa_sig_component_1.IEdicionSigComponent,
            informe_verificacion_medicion_component_1.InformeVerificacionMedicionComponent,
            informe_verificacion_edicion_mapa_sig_1.IVerifEdicionComponent,
            informe_ejecucion_component_1.InformeEjecucionComponent,
            informe_sig_final_component_1.ISigFinalComponent,
            round_progress_component_1.RoundProgressComponent,
            calendar_component_1.CuencaCalendarComponent,
            create_calendar_component_1.CreateCalendarComponent,
            selected_calendar_component_1.SelectedCalendarComponent,
            view_contractors_component_1.ContractorsViewComponent,
            formato_stard_1.FormatoStardComponent,
            sistema_individual_component_1.SistemaIndividualComponent,
            material_vegetal_component_1.MaterialVegetalComponent,
            seguimiento_predial_component_1.SeguimientoPredialComponent,
            control_mantenimientos_component_1.ControlMantenimientosComponent,
            evaluacion_proveedores_compponent_1.EvaluacionProveedoresComponent,
            mapa_calendar_component_1.MapaCalendarComponent,
            views_comando_component_1.ViewsComandoComponent,
            create_aporte_component_1.CreateAporteComponent,
            edit_aporte_component_1.EditAporteComponent,
            traslate_aporte_component_1.TraslateAporteComponent,
            metas_component_1.MetasComponent,
            especies_component_1.EspeciesComponent,
            search_component_1.SearchComponent,
            predio_component_1.PredioComponent,
            supplier_evaluation_component_1.SupplierEvaluationComponent,
            view_pqrs_component_1.ViewPqrsComponent,
            create_pqrs_component_1.CreatePqrsComponent,
            pqrs_component_1.PqrsComponent,
            view_pool_of_contracts_component_1.ViewPoolOfContractsComponent,
            view_monitoreo_component_1.ViewMonitoreoComponent,
            carta_intenci_n_component_1.CartaIntencionComponent,
            view_search_predio_component_1.ViewSearchPredioComponent,
            point_detail_component_1.PointDetailComponent,
            tareas_ejecucion_component_1.TareasEjecucionComponent,
            view_selected_ejecucion_component_1.ViewSelectedEjecucionComponent,
            list_predios_component_1.ListPrediosComponent,
            view_potencial_component_1.ViewPotencialComponent,
            view_task_intention_component_1.ViewTaskIntentionComponent,
            create_tarea_ejecucion_component_1.CreateTareaEjecucionComponent,
            history_task_component_1.HistoryTaskComponent,
            register_user_component_1.RegisterUserComponent,
            list_user_component_1.ListUserComponent,
            register_category_component_1.RegisterCategoryComponent,
            list_categories_component_1.ListCategoriesComponent,
            register_program_component_1.RegisterProgramComponent,
            list_programs_component_1.ListProgramsComponent,
            register_project_component_1.RegisterProjectComponent,
            project_to_program_component_1.ProjectToProgramComponent,
            list_projects_component_1.ListProjectsComponent,
            register_activities_component_1.RegisterActivitiesComponent,
            activity_to_project_component_1.ActivityToProjectComponent,
            list_materials_component_1.ListMaterialsComponent,
            register_material_component_1.RegisterMaterialComponent,
            list_actions_component_1.ListActionsComponent,
            register_action_component_1.RegisterActionComponent
        ],
        providers: [
            globals_1.Globals,
            messaging_service_1.MessagingService,
            geo_json_service_1.GeoJsonService,
            byte_array_utils_1.ByteArrayUtils,
            procedures_manager_1.ProceduresManager,
            cuenca_verde_service_1.CuencaVerdeService,
            auth_service_1.AuthService,
            auth_guard_service_1.AuthGuard,
            session_manager_1.SessionManager,
            tasks_manager_1.TasksManager,
            roles_manager_1.RolesManager,
            pool_of_contracts_manager_1.PoolOfContractsManager,
            contractors_manager_1.ContractorsManager,
            round_progress_service_1.RoundProgressService,
            round_progress_ease_1.RoundProgressEase,
            round_progress_config_1.RoundProgressConfig
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA,
            core_1.CUSTOM_ELEMENTS_SCHEMA
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map