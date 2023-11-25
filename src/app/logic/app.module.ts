import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from '../presentation/app/app.component';
import {MapComponent} from '../presentation/map/map.component';
import {MessagingService} from '../data/services/messaging.service';
import {GeoJsonService} from '../data/services/geo-json.service';
import {ByteArrayUtils} from '../data/utils/byte-array.utils';
import {ProceduresManager} from '../data/managers/procedures.manager';
import {BaseComponent} from '../presentation/base-component/base-component';
import {AuthService} from '../data/services/auth.service';
import {CuencaVerdeService} from '../data/services/cuenca-verde.service';
import {LogInComponent} from '../presentation/log-in/log-in.component';
import {AuthGuard} from '../data/services/auth-guard.service';
import {HttpModule} from '@angular/http';
import {ProceduresComponent} from '../presentation/procedures/view-procedures/procedures.component';
import {ReportsComponent} from '../presentation/reports/reports.component';
import {CreateTaskComponent} from '../presentation/tasks/create-task/create-task.component';
import {AlertsListComponent} from '../presentation/widgets/alerts-list/alerts-list.component';
import {BudgetTrackerComponent} from '../presentation/widgets/budget-tracker/budget-tracker.component';
import {CreateTaskWidgetComponent} from '../presentation/widgets/create-task/create-task-widget.component';
import {TasksComponent} from '../presentation/tasks/view-tasks/tasks.component';
import {DragAndDropComponent} from '../presentation/widgets/drag-and-drop/drag-and-drop.component';
import {DragAndDropDirective} from '../presentation/widgets/drag-and-drop/directives/drag-and-drop.directive';
import {GuardacuencasComponent} from '../presentation/guarda-cuencas/guarda-cuencas.component';
import {ShapeFilesUploaderComponent} from '../presentation/shape-file-uploader/shape-files-uploader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewProjectComponent} from '../presentation/procedures/view-procedure/view-procedure';
import {CoordinationsDashboardComponent} from '../presentation/dashboard/coordinations/coordinations-dashboard.component';
import {MainComponent} from '../presentation/main/main.component';
import {SessionManager} from '../data/managers/session.manager';
import {TasksManager} from '../data/managers/tasks.manager';
import {RolesManager} from '../data/managers/roles.manager';
import {EditTaskComponent} from '../presentation/tasks/edit-task/edit-task.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {ViewTaskComponent} from '../presentation/tasks/view-task/view-task.component';
import {SurveyComponent} from '../presentation/forms/survey/survey.component';
import {BudgetComponent} from '../presentation/budget/view-budgets/budget.component';
import {ProceduresListComponent} from '../presentation/widgets/procedures-list/procedures-list.component';
import {ViewBudgetComponent} from '../presentation/budget/view-budget/view-budget.component';
import {DragAndDropOfacComponent} from '../presentation/widgets/drap-an-drop-ofac/drag-and-drop-ofac.component';
import {MonitoreosComponent} from '../presentation/monitoreos/monitoreos.component';
import {MinutaComponent} from '../presentation/forms/minuta/minuta.component';
import {PoolOfContractsManager} from '../data/managers/pool-of-contracts.manager';
import {CreateProcedureComponent} from '../presentation/procedures/create-procedure/create-procedure.component';
import {EditProcedureComponent} from '../presentation/procedures/edit-procedure/edit-procedure.component';
import {CreatePoolOfContractsComponent} from '../presentation/pool-of-contracts/create-pool-of-contracts/create-pool-of-contracts.component';
import {EditPoolOfContractsComponent} from '../presentation/pool-of-contracts/edit-pool-of-contracts/edit-pool-of-contracts.component';
import {CreateContractorComponent} from '../presentation/contractors/create-contractor/create-contractors.component';
import {ContractorsComponent} from '../presentation/contractors/views-contractors/contractors.component';
import {EditContractorComponent} from '../presentation/contractors/edit-contractor/edit-contractors.component';
import {ContractorsManager} from '../data/managers/contractors.manager';
import {DragAndDropContractorComponent} from '../presentation/widgets/drag-and-drop-contractor/drag-and-drop-contractor.component';
import {IMedicionComponent} from '../presentation/reports/informe-medicion/informe-medicion.component';
import {IEdicionSigComponent} from '../presentation/reports/informe-edicion-mapa-sig/informe-edicion-mapa-sig.component';
import {InformeVerificacionMedicionComponent} from '../presentation/reports/informe-verificacion-medicion/informe-verificacion-medicion.component';
import {IVerifEdicionComponent} from '../presentation/reports/informe-verificacion-edicion-mapa-sig/informe-verificacion-edicion-mapa-sig';
import {InformeEjecucionComponent} from '../presentation/reports/informe-ejecucion/informe-ejecucion.component';
import {ISigFinalComponent} from '../presentation/reports/informe-sig-final/informe-sig-final.component';
import {RoundProgressComponent} from '../presentation/widgets/circular-progress/round-progress.component';
import {RoundProgressService} from '../presentation/widgets/circular-progress/round-progress.service';
import {RoundProgressEase} from '../presentation/widgets/circular-progress/round-progress.ease';
import {RoundProgressConfig} from '../presentation/widgets/circular-progress/round-progress.config';
import {ContractorsViewComponent} from '../presentation/contractors/view-contractor/view-contractors.component';
import {FormatoStardComponent} from '../presentation/forms/formato-stard/formato-stard';
import {SistemaIndividualComponent} from '../presentation/forms/sistema-individual/sistema-individual.component';
import {MaterialVegetalComponent} from '../presentation/forms/material-vegetal/material-vegetal.component';
import {SeguimientoPredialComponent} from '../presentation/forms/seguimiento-predial/seguimiento-predial.component';
import {ControlMantenimientosComponent} from '../presentation/forms/contol-mantenimientos/control-mantenimientos.component';
import {EvaluacionProveedoresComponent} from '../presentation/forms/evaluacion-proveedores/evaluacion-proveedores.compponent';
import {FullCalendarModule} from 'ng-fullcalendar';
import {MapaCalendarComponent} from '../presentation/mapa-calendar/mapa-calendar.component';
import {ViewsComandoComponent} from '../presentation/cuadro-comando/view-cuadro/views-comando.component';
import {CreateAporteComponent} from '../presentation/cuadro-comando/create-aporte/create-aporte.component';
import {EditAporteComponent} from '../presentation/cuadro-comando/edit-aporte/edit-aporte.component';
import {TraslateAporteComponent} from '../presentation/cuadro-comando/traslate-aporte/traslate-aporte.component';
import {MetasComponent} from '../presentation/cuadro-comando/componente-metas/metas.component';
import {EspeciesComponent} from '../presentation/cuadro-comando/component-insert-especies/especies.component';
import {NgAisModule} from 'angular-instantsearch';
import {SearchComponent} from '../presentation/search/search.component';
import {PredioComponent} from '../presentation/predio/predio.component';
import {SupplierEvaluationComponent} from '../presentation/forms/supplier-evaluation/supplier-evaluation.component';
import {ViewPqrsComponent} from '../presentation/pqrs/view-pqrs/view-pqrs.component';
import {CreatePqrsComponent} from '../presentation/pqrs/create-pqrs/create-pqrs.component';
import {PqrsComponent} from '../presentation/pqrs/pqrs-list/pqrs.component';
import {ViewPoolOfContractsComponent} from '../presentation/pool-of-contracts/view-pool-of-contracts/view-pool-of-contracts.component';
import {ViewMonitoreoComponent} from '../presentation/monitoreos/view-monitoreo/view-monitoreo.component';
import {CartaIntencionComponent} from '../presentation/forms/carta-intencion/carta-intención.component';
import {PoolsOfContractsComponent} from '../presentation/pool-of-contracts/view-pools-of-contracts/pools-of-contracts.component';
import {SelectModule} from 'ng-select';
import {ViewSearchPredioComponent} from '../presentation/search/view-predio/view-search-predio.component';
import {CuencaCalendarComponent} from '../presentation/calendar/view-calendar/calendar.component';
import {CreateCalendarComponent} from '../presentation/calendar/create-calendar/create-calendar.component';
import {SelectedCalendarComponent} from '../presentation/calendar/selected-calendar/selected-calendar.component';
import {PointDetailComponent} from '../presentation/calendar/point-detail/point-detail.component';
import {Globals} from '../../globals';
import {TareasEjecucionComponent} from '../presentation/tareas-ejecucion/view-tareas-ejecucion/tareas-ejecucion.component';
import {ViewSelectedEjecucionComponent} from '../presentation/tareas-ejecucion/view-selected-ejecucion/view-selected-ejecucion.component';
import {ListPrediosComponent} from '../presentation/predio-potencial/list-predios/list-predios.component';
import {PredioPotencialComponent} from '../presentation/predio-potencial/create-predio/predio-potencial.component';
import {ViewPotencialComponent} from '../presentation/predio-potencial/view-predio/view-potencial.component';
import {ViewTaskIntentionComponent} from '../presentation/tasks/view-task-intention/view-task-intention.component';
import {CreateTareaEjecucionComponent} from '../presentation/tareas-ejecucion/create-tarea-ejecucion/create-tarea-ejecucion.component';
import {HistoryTaskComponent} from '../presentation/tasks/history-task/history-task.component';
import {RegisterUserComponent} from '../presentation/super-admin/Users/register-user/register-user.component';
import {ListUserComponent} from '../presentation/super-admin/Users/list-user/list-user.component';
import {RegisterCategoryComponent} from '../presentation/super-admin/Categories/register-category/register-category.component';
import {ListCategoriesComponent} from '../presentation/super-admin/Categories/list-categories/list-categories.component';
import {RegisterProgramComponent} from '../presentation/super-admin/Programs/register-program/register-program.component';
import {ListProgramsComponent} from '../presentation/super-admin/Programs/list-programs/list-programs.component';
import {RegisterProjectComponent} from '../presentation/super-admin/Project/register-project/register-project.component';
import {ProjectToProgramComponent} from '../presentation/widgets/add-project-to-program/project-to-program-component';
import {ListProjectsComponent} from '../presentation/super-admin/Project/list-projects/list-projects.component';
import {RegisterActivitiesComponent} from '../presentation/super-admin/Actividades/register-activities/register-activities.component';
import {ActivityToProjectComponent} from '../presentation/widgets/add-activity-to-project/activity-to-project-component';
import {ListActionsComponent} from '../presentation/super-admin/Actions/list-actions/list-actions.component';
import {RegisterActionComponent} from '../presentation/super-admin/Actions/register-action/register-action.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {DragAndDropPredioComponent} from '../presentation/widgets/drag-and-drop-predio/drag-and-drop-predio.component';
import {DragAndDropAnexosComponent} from '../presentation/widgets/drag-and-drop-anexos/drag-and-drop-anexos.component';
import {DragAndDropOpenComponent} from '../presentation/widgets/drag-and-drop-open/drag-and-drop-open.component';
import {SurveyTaskComponent} from '../presentation/forms/survey-task/survey-task.component';
import {CartaIntencionTaskComponent} from '../presentation/forms/carta-intencion-task/carta-intencion-task.component';
import {LoadShapePropertiesComponent} from '../presentation/load-shape-properties/load-shape-properties.component';
import {ShapeFilesUploaderPropertiesComponent} from '../presentation/shape-file-uploader-properties/shape-files-uploader-properties.component';
import {SurveyFormatOneComponent} from '../presentation/forms/survey/survey-format-one/survey-format-one.component';
import {SurveyFormatTwoComponent} from '../presentation/forms/survey/survey-format-two/survey-format-two.component';
import {ViewTaskOpenComponent} from '../presentation/tasks/view-task-open/view-task-open.component';
import {FormTaskComunicationComponent} from '../presentation/widgets/form-task-comunication/form-task-comunication.component';
import {FormEditTaskComunicationComponent} from '../presentation/widgets/form-edit-task-comunication/form-edit-task-comunication.component';
import {DragAndDropFormComunicationComponent} from '../presentation/widgets/drag-and-drop-form-comunication/drag-and-drop-form-comunication.component';
import {LoadBasePredioComponent} from '../presentation/load-base-predios/psa/load-base-predio.component';
import {DragAndDropBasePrediosComponent} from '../presentation/widgets/drag-and-drop-base-predios/drag-and-drop-base-predios.component';
import {MapaTaskExecutionComponent} from '../presentation/mapa-task-execution/mapa-task-execution.component';
import {MapSigTaskExecutionComponent} from '../presentation/map-sig-task-execution/map-sig-task-execution.component';
import {AddGoodPracticesBudgetComponent} from '../presentation/widgets/add-good-practices-budget/add-good-practices-budget.component';
import {LoadReporteGastosComponent} from '../presentation/load-reporte-gastos/load-reporte-gastos.component';
import {DragAndDropTaskComponent} from '../presentation/widgets/drag-and-drop-task/drag-and-drop-task.component';
import {ReportsManagementComponent} from '../presentation/reports/management/reports-management.component';
import {BudgetsDetailsComponent} from '../presentation/budgets-details/create-details-budget/budgets-details.component';
import {PoolContractorFilesComponent} from '../presentation/widgets/pool-contractor-files/pool-contractor-files.component';
import {ViewListDetailsBudgetComponent} from '../presentation/budgets-details/view-list-details-budget/view-list-details-budget.component';
import {LoadBaseProcesosErosivosComponent} from '../presentation/load-base-predios/procesos-erosivos/load-base-procesos-erosivos.component';
import {LoadBaseFuentesHidricasComponent} from '../presentation/load-base-predios/base-fuentes-hidricas/load-base-fuentes-hidricas.component';
import {DragAndDropFuentesHidricasComponent} from '../presentation/widgets/drag-and-drop-fuentes-hidricas/drag-and-drop-fuentes-hidricas.component';
import {DragAndDropProcesosErosivosComponent} from '../presentation/widgets/drag-and-drop-procesos-erosivos/drag-and-drop-procesos-erosivos.component';
import {DragAndDropCentroCostosComponent} from '../presentation/widgets/drag-and-drop-centro-costos/drag-and-drop-centro-costos.component';
import {ReasignDetailsBudgetComponent} from '../presentation/budgets-details/reasign-details-budget/reasign-details-budget.component';
import {ViewBudgetContractorComponent} from '../presentation/budget/view-budget-contractor/view-budget-contractor.component';
import {ViewBudgetFinalComponent} from '../presentation/budget/view-budget-final/view-budget-final.component';
import {OpenTaskMapComponent} from '../presentation/open-map/map.component';
import {ViewCostComponent} from '../presentation/pool-of-contracts/view-cost/view-cost.component';
import {SelectAssociateAmountComponent} from '../presentation/widgets/select-associate-amount/select-associate-amount.component';
import {PropertieslistComponent} from '../presentation/propertieslist/propertieslist.component';
import {IncomeComponent} from '../presentation/income/income.component';
import {CreateAnEditIncomeComponent} from '../presentation/create-an-edit-income/create-an-edit-income.component';
import {SeedCapitalComponent} from '../presentation/seed-capital/seed-capital.component';
import {CreateEditSeedCapitalComponent} from '../presentation/create-edit-seed-capital/create-edit-seed-capital.component';
import {FinancingExpensesComponent} from '../presentation/financing-expenses/financing-expenses.component';
import {CreateFinancingExpensesComponent} from '../presentation/create-financing-expenses/create-financing-expenses.component';
import {ViewEditUserComponent} from '../presentation/super-admin/Users/view-edit-user/view-edit-user.component';
import {ViewEditCategoryComponent} from '../presentation/super-admin/Categories/view-edit-category/view-edit-category.component';
import {ViewEditProgramComponent} from '../presentation/super-admin/Programs/view-edit-program/view-edit-program.component';
import {ReportIphComponent} from '../presentation/reports/report-iph/report-iph.component';
import {IphWidgetComponent} from '../presentation/widgets/iph-widget/iph-widget.component';
import {ListContributorComponent} from '../presentation/super-admin/contributor/list-contributor/list-contributor.component';
import {CreateContributorComponent} from '../presentation/super-admin/contributor/create-contributor/create-contributor.component';
import {EditActionComponent} from '../presentation/super-admin/Actions/edit-action/edit-action.component';
import {DragAndDropOpenTaskCreationComponent} from '../presentation/widgets/drag-and-drop-open-task-creation/drag-and-drop-open-task-creation.component';
import {EventsComponent} from '../presentation/events/events/events.component';
import {ActionsFinancialComponent} from '../presentation/super-admin/actions-financial/actions-financial/actions-financial.component';
import {ActionsFinantialEditComponent} from '../presentation/super-admin/actions-financial/actions-finantial-edit/actions-finantial-edit.component';
import { ForgotPasswordComponent } from '../presentation/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from '../presentation/update-password/update-password.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    SelectModule,
    NgAisModule.forRoot(),
    ColorPickerModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    BaseComponent,
    MapComponent,
    ShapeFilesUploaderComponent,
    SelectAssociateAmountComponent,
    ShapeFilesUploaderPropertiesComponent,
    LogInComponent,
    ProceduresComponent,
    ReportsComponent,
    CreateProcedureComponent,
    OpenTaskMapComponent,
    ViewProjectComponent,
    EditProcedureComponent,
    CreateTaskComponent,
    CoordinationsDashboardComponent,
    AlertsListComponent,
    BudgetTrackerComponent,
    ProceduresListComponent,
    CreateTaskWidgetComponent,
    TasksComponent,
    GuardacuencasComponent,
    DragAndDropComponent,
    DragAndDropOfacComponent,
    DragAndDropContractorComponent,
    DragAndDropDirective,
    DragAndDropOpenComponent,
    EditTaskComponent,
    ViewTaskComponent,
    SurveyComponent,
    SurveyFormatOneComponent,
    SurveyFormatTwoComponent,
    BudgetComponent,
    PredioPotencialComponent,
    ViewBudgetComponent,
    MonitoreosComponent,
    MinutaComponent,
    PoolsOfContractsComponent,
    CreatePoolOfContractsComponent,
    EditPoolOfContractsComponent,
    ContractorsComponent,
    CreateContractorComponent,
    EditContractorComponent,
    IMedicionComponent,
    IEdicionSigComponent,
    InformeVerificacionMedicionComponent,
    IVerifEdicionComponent,
    InformeEjecucionComponent,
    ISigFinalComponent,
    RoundProgressComponent,
    CuencaCalendarComponent,
    CreateCalendarComponent,
    SelectedCalendarComponent,
    ContractorsViewComponent,
    FormatoStardComponent,
    SistemaIndividualComponent,
    MaterialVegetalComponent,
    SeguimientoPredialComponent,
    ControlMantenimientosComponent,
    EvaluacionProveedoresComponent,
    MapaCalendarComponent,
    ViewsComandoComponent,
    CreateAporteComponent,
    EditAporteComponent,
    TraslateAporteComponent,
    MetasComponent,
    EspeciesComponent,
    SearchComponent,
    PredioComponent,
    SupplierEvaluationComponent,
    ViewPqrsComponent,
    CreatePqrsComponent,
    PqrsComponent,
    ViewPoolOfContractsComponent,
    ViewMonitoreoComponent,
    CartaIntencionComponent,
    CartaIntencionTaskComponent,
    ViewSearchPredioComponent,
    PointDetailComponent,
    TareasEjecucionComponent,
    ViewSelectedEjecucionComponent,
    ListPrediosComponent,
    PropertieslistComponent,
    ViewPotencialComponent,
    ViewTaskIntentionComponent,
    CreateTareaEjecucionComponent,
    HistoryTaskComponent,
    RegisterUserComponent,
    ListUserComponent,
    RegisterCategoryComponent,
    ListCategoriesComponent,
    RegisterProgramComponent,
    ListProgramsComponent,
    RegisterProjectComponent,
    ProjectToProgramComponent,
    ListProjectsComponent,
    RegisterActivitiesComponent,
    ActivityToProjectComponent,
    ListActionsComponent,
    RegisterActionComponent,
    DragAndDropPredioComponent,
    DragAndDropAnexosComponent,
    SurveyTaskComponent,
    LoadShapePropertiesComponent,
    ViewTaskOpenComponent,
    FormTaskComunicationComponent,
    FormEditTaskComunicationComponent,
    DragAndDropFormComunicationComponent,
    LoadBasePredioComponent,
    DragAndDropBasePrediosComponent,
    MapaTaskExecutionComponent,
    MapSigTaskExecutionComponent,
    AddGoodPracticesBudgetComponent,
    LoadReporteGastosComponent,
    DragAndDropTaskComponent,
    ReportsManagementComponent,
    BudgetsDetailsComponent,
    PoolContractorFilesComponent,
    ViewListDetailsBudgetComponent,
    LoadBaseProcesosErosivosComponent,
    LoadBaseFuentesHidricasComponent,
    DragAndDropFuentesHidricasComponent,
    DragAndDropProcesosErosivosComponent,
    DragAndDropCentroCostosComponent,
    ReasignDetailsBudgetComponent,
    ViewBudgetContractorComponent,
    ViewBudgetFinalComponent,
    ViewCostComponent,
    IncomeComponent,
    CreateAnEditIncomeComponent,
    SeedCapitalComponent,
    CreateEditSeedCapitalComponent,
    FinancingExpensesComponent,
    CreateFinancingExpensesComponent,
    ViewEditUserComponent,
    ViewEditCategoryComponent,
    ViewEditProgramComponent,
    ReportIphComponent,
    IphWidgetComponent,
    ListContributorComponent,
    CreateContributorComponent,
    EditActionComponent,
    DragAndDropOpenTaskCreationComponent,
    EventsComponent,
    ActionsFinancialComponent,
    ActionsFinantialEditComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent
  ],
  providers: [
    Globals,
    MessagingService,
    GeoJsonService,
    ByteArrayUtils,
    ProceduresManager,
    CuencaVerdeService,
    AuthService,
    AuthGuard,
    SessionManager,
    TasksManager,
    RolesManager,
    PoolOfContractsManager,
    ContractorsManager,
    RoundProgressService,
    RoundProgressEase,
    RoundProgressConfig,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
