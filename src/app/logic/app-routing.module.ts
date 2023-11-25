import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

import {LogInComponent} from '../presentation/log-in/log-in.component';
import {AuthGuard} from '../data/services/auth-guard.service';
import {ProceduresComponent} from '../presentation/procedures/view-procedures/procedures.component';
import {ReportsComponent} from '../presentation/reports/reports.component';
import {CreateTaskComponent} from '../presentation/tasks/create-task/create-task.component';
import {BaseComponent} from '../presentation/base-component/base-component';
import {CreateTaskWidgetComponent} from '../presentation/widgets/create-task/create-task-widget.component';
import {TasksComponent} from '../presentation/tasks/view-tasks/tasks.component';
import {GuardacuencasComponent} from '../presentation/guarda-cuencas/guarda-cuencas.component';
import {MapComponent} from '../presentation/map/map.component';
import {ViewProjectComponent} from '../presentation/procedures/view-procedure/view-procedure';
import {MainComponent} from '../presentation/main/main.component';
import {CoordinationsDashboardComponent} from '../presentation/dashboard/coordinations/coordinations-dashboard.component';
import {EditTaskComponent} from '../presentation/tasks/edit-task/edit-task.component';
import {ViewTaskComponent} from '../presentation/tasks/view-task/view-task.component';
import {SurveyComponent} from '../presentation/forms/survey/survey.component';
import {SurveyTaskComponent} from '../presentation/forms/survey-task/survey-task.component';
import {BudgetComponent} from '../presentation/budget/view-budgets/budget.component';
import {PredioPotencialComponent} from '../presentation/predio-potencial/create-predio/predio-potencial.component';
import {ViewBudgetComponent} from '../presentation/budget/view-budget/view-budget.component';
import {MinutaComponent} from '../presentation/forms/minuta/minuta.component';
import {PoolsOfContractsComponent} from '../presentation/pool-of-contracts/view-pools-of-contracts/pools-of-contracts.component';
import {EditPoolOfContractsComponent} from '../presentation/pool-of-contracts/edit-pool-of-contracts/edit-pool-of-contracts.component';
import {CreateProcedureComponent} from '../presentation/procedures/create-procedure/create-procedure.component';
import {EditProcedureComponent} from '../presentation/procedures/edit-procedure/edit-procedure.component';
import {ContractorsComponent} from '../presentation/contractors/views-contractors/contractors.component';
import {CreateContractorComponent} from '../presentation/contractors/create-contractor/create-contractors.component';
import {EditContractorComponent} from '../presentation/contractors/edit-contractor/edit-contractors.component';
import {CreatePoolOfContractsComponent} from '../presentation/pool-of-contracts/create-pool-of-contracts/create-pool-of-contracts.component';
import {IMedicionComponent} from '../presentation/reports/informe-medicion/informe-medicion.component';
import {IEdicionSigComponent} from '../presentation/reports/informe-edicion-mapa-sig/informe-edicion-mapa-sig.component';
import {InformeVerificacionMedicionComponent} from '../presentation/reports/informe-verificacion-medicion/informe-verificacion-medicion.component';
import {IVerifEdicionComponent} from '../presentation/reports/informe-verificacion-edicion-mapa-sig/informe-verificacion-edicion-mapa-sig';
import {InformeEjecucionComponent} from '../presentation/reports/informe-ejecucion/informe-ejecucion.component';
import {ISigFinalComponent} from '../presentation/reports/informe-sig-final/informe-sig-final.component';
import {CuencaCalendarComponent} from '../presentation/calendar/view-calendar/calendar.component';
import {ContractorsViewComponent} from '../presentation/contractors/view-contractor/view-contractors.component';
import {FormatoStardComponent} from '../presentation/forms/formato-stard/formato-stard';
import {SistemaIndividualComponent} from '../presentation/forms/sistema-individual/sistema-individual.component';
import {MaterialVegetalComponent} from '../presentation/forms/material-vegetal/material-vegetal.component';
import {SeguimientoPredialComponent} from '../presentation/forms/seguimiento-predial/seguimiento-predial.component';
import {ControlMantenimientosComponent} from '../presentation/forms/contol-mantenimientos/control-mantenimientos.component';
import {EvaluacionProveedoresComponent} from '../presentation/forms/evaluacion-proveedores/evaluacion-proveedores.compponent';
import {ViewsComandoComponent} from '../presentation/cuadro-comando/view-cuadro/views-comando.component';
import {CreateAporteComponent} from '../presentation/cuadro-comando/create-aporte/create-aporte.component';
import {EditAporteComponent} from '../presentation/cuadro-comando/edit-aporte/edit-aporte.component';
import {TraslateAporteComponent} from '../presentation/cuadro-comando/traslate-aporte/traslate-aporte.component';
import {SearchComponent} from '../presentation/search/search.component';
import {PredioComponent} from '../presentation/predio/predio.component';
import {SupplierEvaluationComponent} from '../presentation/forms/supplier-evaluation/supplier-evaluation.component';
import {ViewPqrsComponent} from '../presentation/pqrs/view-pqrs/view-pqrs.component';
import {CreatePqrsComponent} from '../presentation/pqrs/create-pqrs/create-pqrs.component';
import {PqrsComponent} from '../presentation/pqrs/pqrs-list/pqrs.component';
import {ViewPoolOfContractsComponent} from '../presentation/pool-of-contracts/view-pool-of-contracts/view-pool-of-contracts.component';
import {ViewMonitoreoComponent} from '../presentation/monitoreos/view-monitoreo/view-monitoreo.component';
import {CartaIntencionComponent} from '../presentation/forms/carta-intencion/carta-intención.component';
import {ViewSearchPredioComponent} from '../presentation/search/view-predio/view-search-predio.component';
import {CreateCalendarComponent} from '../presentation/calendar/create-calendar/create-calendar.component';
import {SelectedCalendarComponent} from '../presentation/calendar/selected-calendar/selected-calendar.component';
import {TareasEjecucionComponent} from '../presentation/tareas-ejecucion/view-tareas-ejecucion/tareas-ejecucion.component';
import {ViewSelectedEjecucionComponent} from '../presentation/tareas-ejecucion/view-selected-ejecucion/view-selected-ejecucion.component';
import {ListPrediosComponent} from '../presentation/predio-potencial/list-predios/list-predios.component';
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
import {ListProjectsComponent} from '../presentation/super-admin/Project/list-projects/list-projects.component';
import {RegisterActivitiesComponent} from '../presentation/super-admin/Actividades/register-activities/register-activities.component';
import {ListActionsComponent} from '../presentation/super-admin/Actions/list-actions/list-actions.component';
import {RegisterActionComponent} from '../presentation/super-admin/Actions/register-action/register-action.component';
import {LoadShapePropertiesComponent} from '../presentation/load-shape-properties/load-shape-properties.component';
import {ViewTaskOpenComponent} from '../presentation/tasks/view-task-open/view-task-open.component';
import {LoadBasePredioComponent} from '../presentation/load-base-predios/psa/load-base-predio.component';
import {MapSigTaskExecutionComponent} from '../presentation/map-sig-task-execution/map-sig-task-execution.component';
import {LoadReporteGastosComponent} from '../presentation/load-reporte-gastos/load-reporte-gastos.component';
import {ReportsManagementComponent} from '../presentation/reports/management/reports-management.component';
import {BudgetsDetailsComponent} from '../presentation/budgets-details/create-details-budget/budgets-details.component';
import {ViewListDetailsBudgetComponent} from '../presentation/budgets-details/view-list-details-budget/view-list-details-budget.component';
import {LoadBaseFuentesHidricasComponent} from '../presentation/load-base-predios/base-fuentes-hidricas/load-base-fuentes-hidricas.component';
import {LoadBaseProcesosErosivosComponent} from '../presentation/load-base-predios/procesos-erosivos/load-base-procesos-erosivos.component';
import {ReasignDetailsBudgetComponent} from '../presentation/budgets-details/reasign-details-budget/reasign-details-budget.component';
import {ViewBudgetContractorComponent} from '../presentation/budget/view-budget-contractor/view-budget-contractor.component';
import {ViewBudgetFinalComponent} from '../presentation/budget/view-budget-final/view-budget-final.component';
import {OpenTaskMapComponent} from '../presentation/open-map/map.component';
import {ViewCostComponent} from '../presentation/pool-of-contracts/view-cost/view-cost.component';
import {PropertieslistComponent} from '../presentation/propertieslist/propertieslist.component';
import {IncomeComponent} from '../presentation/income/income.component';
import {SeedCapitalComponent} from '../presentation/seed-capital/seed-capital.component';
import {FinancingExpensesComponent} from '../presentation/financing-expenses/financing-expenses.component';
import {ViewEditUserComponent} from '../presentation/super-admin/Users/view-edit-user/view-edit-user.component';
import {ViewEditCategoryComponent} from '../presentation/super-admin/Categories/view-edit-category/view-edit-category.component';
import {ViewEditProgramComponent} from '../presentation/super-admin/Programs/view-edit-program/view-edit-program.component';
import {ReportIphComponent} from '../presentation/reports/report-iph/report-iph.component';
import {ListContributorComponent} from '../presentation/super-admin/contributor/list-contributor/list-contributor.component';
import {CreateContributorComponent} from '../presentation/super-admin/contributor/create-contributor/create-contributor.component';
import {EditActionComponent} from '../presentation/super-admin/Actions/edit-action/edit-action.component';
import {EventsComponent} from '../presentation/events/events/events.component';
import {ActionsFinancialComponent} from '../presentation/super-admin/actions-financial/actions-financial/actions-financial.component';
import {ActionsFinantialEditComponent} from '../presentation/super-admin/actions-financial/actions-finantial-edit/actions-finantial-edit.component';
import { ForgotPasswordComponent } from '../presentation/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from '../presentation/update-password/update-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CoordinationsDashboardComponent,
        children: [
          {
            path: 'procedures/:id',
            component: ProceduresComponent
          }
        ]
      },
      {
        path: 'guarda-cuencas',
        component: GuardacuencasComponent,
        data: {
          state: 'guarda-cuencas'
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          state: 'reports'
        }
      },
      {
        path: 'loadShapeProperties',
        component: LoadShapePropertiesComponent,
        data: {
          state: 'loadShapeProperties'
        }
      },
      { // detalles del presupuesto
        path: 'create-details-budgets',
        component: BudgetsDetailsComponent,
        data: {
          state: 'create-details-budgets'
        }
      },
      { // mapa id task
        path: 'map/:id',
        component: MapComponent,
        data: {
          state: 'map'
        }
      },
      { // mapa id task
        path: 'open-task-map/:id',
        component: OpenTaskMapComponent,
        data: {
          state: 'map'
        }
      },
      { // mapa de seguimiento id task
        path: 'map-sig-task-execution/:id',
        component: MapSigTaskExecutionComponent,
        data: {
          state: 'map-sig-task-execution'
        }
      },
      { // load reportes de gasto
        path: 'load-reporte-gastos',
        component: LoadReporteGastosComponent,
        data: {
          state: 'load-reporte-gastos'
        }
      },
      { // lista de procedimientos
        path: 'procedures',
        component: ProceduresComponent,
        data: {
          state: 'procedures'
        }
      },
      {
        path: 'create-procedures',
        component: CreateProcedureComponent,
        children: [
          {
            path: '',
            component: BaseComponent
          },
          {
            path: 'create-task',
            component: CreateTaskWidgetComponent
          }
        ],
        data: {
          state: 'procedures'
        }
      },
      {
        path: 'create-procedures/:id',
        component: CreateProcedureComponent,
        data: {
          state: 'procedures'
        }
      },
      { // ver procedimiento ID
        path: 'view-procedures/:id',
        component: ViewProjectComponent,
        data: {
          state: 'procedures'
        }
      },
      { // editar procedimiento ID
        path: 'edit-procedures/:id',
        component: EditProcedureComponent,
        data: {
          state: 'procedures'
        }
      },
      {  // listado de tareas
        path: 'tasks',
        component: TasksComponent,
        data: {
          state: 'tasks'
        }
      },
      {  // crear tareas
        path: 'create-tasks',
        component: CreateTaskComponent,
        data: {
          state: 'tasks'
        }
      },
      {  // crear tareas
        path: 'create-tasks/:id',
        component: CreateTaskComponent,
        data: {
          state: 'tasks'
        }
      },
      {  // ver tareas ID
        path: 'view-tasks/:id',
        component: ViewTaskComponent,
        data: {
          state: 'tasks'
        }
      },
      {  // cargar base de predios
        path: 'load-predio-base',
        component: LoadBasePredioComponent
      },
      {  // cargar base de fuentes hidricas
        path: 'load-base-fuentes-hidricas',
        component: LoadBaseFuentesHidricasComponent
      },
      {  // cargar base de procesos erosivos
        path: 'load-base-procesos-erosivos',
        component: LoadBaseProcesosErosivosComponent
      },
      {  // ver predio buscado
        path: 'view-search-predio/:id',
        component: ViewSearchPredioComponent,
        data: {
          state: 'view-search-predio'
        }
      },
      {  // reasignacion de detalle de presupuesto
        path: 'edit-budget/:id',
        component: ReasignDetailsBudgetComponent,
        data: {
          state: 'reasign-detail'
        }
      },
      {  // editar tarea ID
        path: 'edit-tasks/:id',
        component: EditTaskComponent,
        data: {
          state: 'tasks'
        }
      },
      {
        path: 'coordinations',
        component: CoordinationsDashboardComponent,
        data: {
          state: 'coordinations'
        }
      },
      {  // encuesta por ID
        path: 'survey/:id',
        component: SurveyComponent,
        data: {
          state: 'survey'
        }
      },
      {  // encuesta respaldo
        path: 'survey-task/:id',
        component: SurveyTaskComponent,
        data: {
          state: 'survey-task'
        }
      },
      { // presupuestos
        path: 'budgets',
        component: BudgetComponent,
        data: {
          state: 'budgets'
        }
      },
      { // presupuesto INICIAL detalle idProcedimiento idTask
        path: 'budgets/:id/:idTask',
        component: ViewBudgetComponent,
        data: {
          state: 'view-budgets'
        }
      },
      { // presupuesto CONTRATISTA detalle idProcedimiento idTask
        path: 'budgetsContractor/:id/:idTask',
        component: ViewBudgetContractorComponent,
        data: {
          state: 'view-budgets-contractor'
        }
      },
      { // presupuesto FINAL detalle idProcedimiento idTask
        path: 'budgetsFinal/:id/:idTask',
        component: ViewBudgetFinalComponent,
        data: {
          state: 'view-budgets-final'
        }
      },
      { // crear predio potencial
        path: 'predio-potencial',
        component: PredioPotencialComponent,
        data: {
          state: 'predio-potencial'
        }
      },
      { // ver predio potencial
        path: 'view-potencial/:id',
        component: ViewPotencialComponent,
        data: {
          state: 'view-potencial'
        }
      },
      { // listado de predio potencial
        path: 'list-predios',
        component: ListPrediosComponent,
        data: {
          state: 'list-predios'
        }
      },
      { // ver minuta iD
        path: 'ver-minuta/:id',
        component: MinutaComponent,
        data: {
          state: 'ver-minuta'
        }
      },
      { // ver carta de intencion ID
        path: 'ver-carta-intencion/:id',
        component: CartaIntencionComponent,
        data: {
          state: 'ver-carta-intencion'
        }
      },
      { // tarea carta de intencion ver ID
        path: 'tarea-carta-intencion/:id',
        component: ViewTaskIntentionComponent,
        data: {
          state: 'tarea-carta-intencion'
        }
      },
      { // tarea abierta ID ver
        path: 'tarea-open/:id',
        component: ViewTaskOpenComponent,
        data: {
          state: 'tasks'
        }
      },
      { // ver informe de medicion ID
        path: 'informe-medicion/:id',
        component: IMedicionComponent,
        data: {
          state: 'informe-medicion'
        }
      },
      { // ver informe de verificacion de medicion ID
        path: 'informe-verificacion-medicion/:id',
        component: InformeVerificacionMedicionComponent,
        data: {
          state: 'informe-verificacion-medicion'
        }
      },
      { // ver informe de edicion ID
        path: 'informe-verificacion-edicion/:id',
        component: IVerifEdicionComponent,
        data: {
          state: 'informe-verificacion-edicion'
        }
      },

      { // ver informe de ejecucion ID
        path: 'informe-ejecucion/:id',
        component: InformeEjecucionComponent,
        data: {
          state: 'informe-ejecucion'
        }
      },
      { // ver informe de edicion ID
        path: 'informe-edicion/:id',
        component: IEdicionSigComponent,
        data: {
          state: 'informe-medicion'
        }
      },
      { // ver informe final SIG ID
        path: 'informe-final-sig/:id',
        component: ISigFinalComponent,
        data: {
          state: 'informe-final-sig'
        }
      },
      { // ver calendario de predios
        path: 'calendar',
        component: CuencaCalendarComponent,
        data: {
          state: 'cuenca-calendar'
        }
      },
      { // ver informe de medicion ID
        path: 'selected-calendar/:id',
        component: SelectedCalendarComponent,
        data: {
          state: 'cuenca-calendar-selected'
        }
      },
      {
        path: 'create-calendar/:fecha',
        component: CreateCalendarComponent,
        data: {
          state: 'cuenca-calendar-crear'
        }
      },
      {
        path: 'pools-of-contracts',
        component: PoolsOfContractsComponent,
        data: {
          state: 'pools-of-contracts'
        }
      },
      {
        path: 'create-pools-of-contracts',
        component: CreatePoolOfContractsComponent,
        data: {
          state: 'pools-of-contracts'
        }
      },
      {
        path: 'edit-pools-of-contracts/:id',
        component: EditPoolOfContractsComponent,
        data: {
          state: 'pools-of-contracts'
        }
      },
      {
        path: 'view-pools-of-contracts/:id',
        component: ViewPoolOfContractsComponent,
        data: {
          state: 'pools-of-contracts'
        }
      },
      {
        path: 'view-cost/:id',
        component: ViewCostComponent,
        data: {
          state: 'view-cost'
        }
      },
      {
        path: 'contractors',
        component: ContractorsComponent,
        data: {
          state: 'contractors'
        }
      },
      {
        path: 'create-contractors',
        component: CreateContractorComponent,
        data: {
          state: 'create-contractors'
        }
      },
      {
        path: 'edit-contractors/:id',
        component: EditContractorComponent,
        data: {
          state: 'edit-contractors'
        }
      },
      {
        path: 'view-contractor/:id',
        component: ContractorsViewComponent,
        data: {
          state: 'view-contractor'
        }
      }, ///////////////////////////// ANEXOS FORMULARIOS
      {
        path: 'formato-stard/:id',
        component: FormatoStardComponent,
        data: {
          state: 'formato-stard'
        }
      },
      {
        path: 'sistema-individual/:id',
        component: SistemaIndividualComponent,
        data: {
          state: 'sistema-individual'
        }
      },
      {
        path: 'material-vegetal/:id',
        component: MaterialVegetalComponent,
        data: {
          state: 'material-vegetal'
        }
      },
      {
        path: 'seguimiento-predial/:id',
        component: SeguimientoPredialComponent,
        data: {
          state: 'seguimiento-predial'
        }
      },
      {
        path: 'control-mantenimientos/:id',
        component: ControlMantenimientosComponent,
        data: {
          state: 'control-mantenimientos'
        }
      },
      {
        path: 'evaluacion-proveedores/:id',
        component: EvaluacionProveedoresComponent,
        data: {
          state: 'evaluacion-proveedores'
        }
      },
      {
        path: 'evaluacion-proveedores/:id',
        component: EvaluacionProveedoresComponent,
        data: {
          state: 'evaluacion-proveedores'
        }
      }, /////////////// Cuadro de comando y control
      {
        path: 'comando',
        component: ViewsComandoComponent,
        data: {
          state: 'comando'
        }
      },
      {
        path: 'create-aporte',
        component: CreateAporteComponent,
        data: {
          state: 'create-aporte'
        }
      },
      {
        path: 'edit-aporte/:id',
        component: EditAporteComponent,
        data: {
          state: 'edit-aporte'
        }
      },
      {
        path: 'traslate-aporte/:id',
        component: TraslateAporteComponent,
        data: {
          state: 'traslate-aporte'
        }
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          state: 'search'
        }
      },
      {
        path: 'search/:query',
        component: SearchComponent,
        data: {
          state: 'search'
        }
      },
      {
        path: 'predio/:id',
        component: PredioComponent,
        data: {
          state: 'predio'
        }
      },
      {
        path: 'forms/supplier-evaluation/:id',
        component: SupplierEvaluationComponent,
        data: {
          state: 'forms'
        }
      },
      {
        path: 'pqrs',
        component: PqrsComponent,
        data: {
          state: 'pqrsList'
        }
      },
      {
        path: 'create-pqrs',
        component: CreatePqrsComponent,
        data: {
          state: 'pqrsList'
        }
      },
      {
        path: 'view-pqrs/:id',
        component: ViewPqrsComponent,
        data: {
          state: 'pqrsList'
        }
      },
      {
        path: 'view-monitoreos/:id',
        component: ViewMonitoreoComponent,
        data: {
          state: 'monitoreos'
        }
      },
      {
        path: 'tareas-ejecucion',
        component: TareasEjecucionComponent,
        data: {
          state: 'tareas-ejecucion'
        }
      },
      {
        path: 'historial-tareas',
        component: HistoryTaskComponent,
        data: {
          state: 'historial-tareas'
        }
      },
      {
        path: 'view-tarea-ejecucion/:id',
        component: ViewSelectedEjecucionComponent,
        data: {
          state: 'view-tarea-ejecucion'
        }
      },
      {
        path: 'create-tarea-ejecucion',
        component: CreateTareaEjecucionComponent,
        data: {
          state: 'create-tarea-ejecucion'
        }
      },
      ////// SUPER ADMINISTRATOR
      {
        path: 'register-user',
        component: RegisterUserComponent,
        data: {
          state: 'register-user'
        }
      },
      {
        path: 'list-user',
        component: ListUserComponent,
        data: {
          state: 'list-user'
        }
      },
      {
        path: 'view-edit-user/:id',
        component: ViewEditUserComponent,
        data: {
          state: 'view-edit-user'
        }
      },
      {
        path: 'list-category',
        component: ListCategoriesComponent,
        data: {
          state: 'list-category'
        }
      },
      {
        path: 'register-category',
        component: RegisterCategoryComponent,
        data: {
          state: 'register-category'
        }
      },
      {
        path: 'view-Edit-category/:id',
        component: ViewEditCategoryComponent ,
        data: {
          state: 'view-Edit-category'
        }
      },
      {
        path: 'register-program',
        component: RegisterProgramComponent,
        data: {
          state: 'register-program'
        }
      },
      {
        path: 'list-programs',
        component: ListProgramsComponent,
        data: {
          state: 'list-programs'
        }
      },
      {
        path: 'view-edit-program/:id',
        component: ViewEditProgramComponent,
        data: {
          state: 'view-edit-program'
        }
      },
      {
        path: 'register-project',
        component: RegisterProjectComponent,
        data: {
          state: 'register-projects'
        }
      },
      {
        path: 'list-projects',
        component: ListProjectsComponent,
        data: {
          state: 'list-projects'
        }
      },
      {
        path: 'register-activities/:id',
        component: RegisterActivitiesComponent,
        data: {
          state: 'register-activities'
        }
      },
      {
        path: 'list-actions',
        component: ListActionsComponent,
        data: {
          state: 'list-actions'
        }
      },
      {
        path: 'register-action',
        component: RegisterActionComponent,
        data: {
          state: 'register-action'
        }
      },
      {
        path: 'edit-action/:id',
        component: EditActionComponent,
        data: {
          state: 'register-action'
        }
      },
      {
        path: 'view-list-details-budget',
        component: ViewListDetailsBudgetComponent,
        data: {
          state: 'view-list-details-budget'
        }
      },
      {
        path: 'report-management',
        component: ReportsManagementComponent,
        data: {
          state: 'report-management'
        }
      },
      {
        path: 'properties-list',
        component: PropertieslistComponent,
        data: {
          state: 'properties-list'
        }
      },
      {
        path: 'income',
        component: IncomeComponent,
        data: {
          state: 'income'
        }
      },
      {
        path: 'seed-capital',
        component: SeedCapitalComponent,
        data: {
          state: 'seed-capital'
        }
      },
      {
        path: 'financing-expenses',
        component: FinancingExpensesComponent,
        data: {
          state: 'financing-expenses'
        }
      },
      {
        path: 'report-iph',
        component: ReportIphComponent,
        data: {
          state: 'report-iph'
        }
      },
      {
        path: 'list-contributor',
        component: ListContributorComponent,
        data: {
          state: 'list-contributor'
        }
      },
      {
        path: 'create-contributor/:id',
        component: CreateContributorComponent,
        data: {
          state: 'create-contributor'
        }
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'actions-financial',
        component: ActionsFinancialComponent,
      },
      {
        path: 'actions-financial-edit',
        component: ActionsFinantialEditComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LogInComponent,
    data: {
      state: 'login'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      const link = ['/app'];
      this.router.navigate(link);
    };
  }
}
