import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {Procedure} from '../model/procedure';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {User} from '../model/user';
import {CuencaVerdeServiceObjectMapper} from './cuenca-verde-service-object-mapper';
import {CuencaCreateResponse} from './model/CuencaCreateResponse';
import {Task} from '../model/task';
import {Monitoreo} from '../model/monitoreo';
import {PoolOfContracts} from '../model/pool-of-contracts';
import {Budget} from '../model/budget';
import {Contractor} from '../model/contractor';
import {MonitoreoTypes} from '../model/monitoreo_types';
import {BudgetListItem} from '../model/budget-list-item';
import {CuencaCreateTaskResponse} from './model/CuencaCreateTaskResponse';
import {Aporte} from '../model/aporte';
import {AporteList} from '../model/aporteList';
import {MetasAporte} from '../model/metasAporte';
import {PredioInfo} from '../model/predio-info';
import {SupplierEvaluation} from '../model/forms/supplier-evaluation';
import {PQRS} from '../model/pqrs';
import {PQRSType} from '../model/PQRSType';
import {Dependency} from '../model/Dependency';
import {PoolOfContractsProcedure} from '../model/pool-of-contracts-procedure';
import {MonitoreoDetail} from '../model/monitoreo-detail';
import {Program} from '../model/program';
import {Activity} from '../model/activity';
import {Project} from '../model/project';
import {FormComunication} from '../model/formComunication';
import {DetailsBudgets} from '../model/details-budgets';
import {FileContractor} from '../model/fileContractor';
import {ActionData} from '../model/actionData';
import {PropertyOwnership} from '../model/predio-ownership';
import {MuestreoHidricoExtraInfo} from '../model/muestreo-hidrico-extra-info';
import {ActionByPool} from '../model/action-by-pool';
import {AssignContractorRequest} from '../model/assign-contractor-request';
import {ProcedureActivity} from '../model/procedure-activity';
import {Income} from '../model/income';
import {ActivityValueByContractor} from '../model/activity-value-by-contractor';
import {SeedCapital} from '../model/seedCapital';
import {Expense} from '../model/expense';
import {reject} from 'q';
import {Categories} from '../model/categories';
import {RoleClass} from '../model/RoleClass';
import {Asociado} from '../model/asociado';
import {ObjectActions} from '../model/actions';
import GeoJson = geoJsonInterface.GeoJson;
import Role = roleInterface.Role;
import Property = propertyInterface.Property;
import Comments = commentsInterface.Comments;
import Documents = documentsInterface.Documents;
import Anexo = anexoInterface.Anexo;

@Injectable()
export class CuencaVerdeService extends BaseService {
  private PROJECTS_END_POINT = 'process';
  private TASKS_END_POINT = 'tasks';
  private CONSULT_FILES = 'generals/files/task';
  private POOL_OF_CONTRACTS_PROCEDURES_END_POINT = 'pool/budget/process';
  private POOL_OF_CONTRACTS_END_POINT = 'pool';
  private MONITOREOS_END_POINT = 'monitoring';
  private CARTA_INTENCION_END_POINT = 'generals/letter/intention';
  private OPEN_TASKS_END_POINT = 'generals/task/open';
  private PROCEDURE_PERCENTAGE_END_POINT = 'generals/percentage/task/execution';
  private CONTRACTOR_ACTIONS_VALUES_END_POINT = 'generals/activities/pool';
  private ASSIGN_CONTRACTOR_TO_POOL_END_POINT = 'generals/otherData/contractor';
  private ADD_ACTIONS_TO_POOL_END_POINT = 'pool/actions/contractor';
  private SAVE_UNFORESEEN_VALUE_TO_POOL_END_POINT = 'generals/unforeseen/contractor';
  private ACTIVITIES_END_POINT = 'process/by/activities';
  private CONTRACTOR_ACTION_VALUE_END_POINT = 'generals/TariffActionContractor';

  getProcedures(): Promise<Array<Procedure>> {
    const url = `${this.API_HOST}/process`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToProceduresArray)
      .catch(this.handleError);
  }

  getAllForMonitoringCalendar(): Promise<Array<any>> {
    const url = `${this.API_HOST}/process/filter/taskMeasurement`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapFilteredProceduresResponseToProceduresArray)
      .catch(this.handleError);
  }

  getAllAssociatedByType(type: string): Promise<any> {
    const data: object = {
      'type': type
    };
    const url = `${this.API_HOST}/generals/associated`;
    return this.http
      .get(url, {headers: this.cuencaHeaders, params: data})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAllIncomes(): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/getAllIncomes`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTotalForCordinations(): Promise<any> {
    const url = `${this.API_HOST}/generals/coordinating/budget`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  bugdetByProcess(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/comandProces/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////xhr.open('GET', `http://0.31:5000/commandand/report`);
  getExcel(): Promise<any> {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });

      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  getFilePoolContract(idFile: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/zip'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `${this.API_HOST}/pool/download/${idFile}`);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  getFileReporteCosto(): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/zip'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `${this.API_HOST}/generals/financier/getLastLoadExel`);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  getExcelDos(): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `http://192.168.0.31:5000/generals/excel/property`);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  getExcelFromUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `${this.API_HOST}/${url}`);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  public getExcelContracts(dataFrom: string, dataTo: string): Promise<any> {
    let data: object;
    data = {
      'from': dataFrom,
      'to': dataTo
    };
    return new Promise((resolve, reject) => {
      let params: string;
      params = 'from=' + dataFrom + '&to=' + dataTo;
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `${this.API_HOST}/generals/forcontractor?` + params);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  public getExcelProperties(): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `${this.API_HOST}/generals/excel/property`);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  getFile(url: string): Promise<any> {
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  downLoadExcel(type: number, idPool: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          try {
            const blob: Blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            resolve(blob);
          } catch (ex) {
            reject(ex);
          }
        }
      });
      xhr.open('GET', `${this.API_HOST}/generals/excel_report/budget/${String(type)}/${String(idPool)}`);
      const objeto: any = JSON.parse(localStorage.getItem('authToken'));
      const head = objeto.token_type + ' ' + objeto.access_token;
      xhr.setRequestHeader('authorization', head);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    });
  }

  getPrograms(): Promise<any> {
    const url = `${this.API_HOST}/generals/programs`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Program>)
      .catch(this.handleError);
  }

  /// borrar archivo de bolsa de contratacion
  deleteFilePoolContractor(idFile: string): Promise<any> {
    const url = `${this.API_HOST}/pool/delete/${idFile}`;
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getProfile(): Promise<any> {
    const url = `${this.API_HOST}/profile`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getPrediosDetailsById(idPredio: string): Promise<any> {
    const url = `${this.API_HOST}/potential/property/${idPredio}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPredios(): Promise<any> {
    const url = `${this.API_HOST}/generals/property/consult/potential/0`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getActivitiesByContribution(procedureId: string, contributionType: string): Promise<any> {
    const url = `${this.API_HOST}/generals/consult/all_activities/process/${procedureId}/${contributionType}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<ProcedureActivity>)
      .catch(this.handleError);
  }

  getProperties(objFilter: any): Promise<any> {
    const url = `${this.API_HOST}/properties`;
    return this.http
      .get(url, {params: objFilter, headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPrediosSinProcedimiento(): Promise<any> {
    const url = `${this.API_HOST}/potential/real/no_process`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getDetailsRegisterBudget(): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/getCommandDetail`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getBasePrediosDocument(typeDocument: string): Promise<any> {
    const url = `${this.API_HOST}/generals/task/getDocument/${typeDocument}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getLastReport(): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/getInfoLoadExel`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getActivitiesContributionFinancial(): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/getContribution`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getDetailBudgetFinancier(idDetail: String): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/getCommandDetail/${idDetail}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getPromgramProjectDetailsBudget(): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/programProject`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getAssociatedTask(typeProcess: String): Promise<any> {
    const url = `${this.API_HOST}/generals/getContribution/${typeProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getMunicipios(): Promise<any> {
    const url = `${this.API_HOST}/generals/municipality/2`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPrediosProc(idProc: number): Promise<any> {
    const url = `${this.API_HOST}/property/consult/potential/exist/${idProc}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getSpeciesList(activity: String): Promise<any> {
    const url = `${this.API_HOST}/generals/getContributionSpecie/${activity}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getGeoJson(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/maps/task/geojson/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => {response.json() as GeoJson})
      .catch(this.handleError);
  }

  getOpenTaskGeoJson(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/GeoMap/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getGeoJsonFromTaskIdExecution(taskId: string): Promise<GeoJson> {
    const url = `${this.API_HOST}/execution/GeoMap/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as GeoJson)
      .catch(this.handleError);
  }

  sendProperty(geoJson: GeoJson): Promise<any> {
    const url = `${this.API_HOST}/property`;
    return this.http
      .post(url, {headers: this.cuencaHeaders}, JSON.stringify(geoJson))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  sendHidricoFormExtraInfo(taskId: string, muestreoHidricoExtraInfo: MuestreoHidricoExtraInfo): Promise<any> {
    const request = {
      data: muestreoHidricoExtraInfo,
      task_id: taskId
    };
    const url = `${this.API_HOST}/generals/taskOpen/otherCamps`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createProcedure(procedure: Procedure): Promise<CuencaCreateResponse> {
    const request: any = CuencaVerdeServiceObjectMapper.mapProcedureToRequest(procedure);
    const url = `${this.API_HOST}/${this.PROJECTS_END_POINT}`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  public createSeedCapital(dataSeedCapital: SeedCapital): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/seedCapital`;
    return this.http
      .post(url, dataSeedCapital, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public createAction(dataActions: any): Promise<any> {
    let data: object;
    data = {
      action_name: dataActions.name,
      good_practicess: dataActions.good_practicess,
      type_action: dataActions.type,
      color: dataActions.color,
      material_name: dataActions.material.name,
      price: dataActions.material.price,
      type_material: dataActions.material.type,
      measurement: dataActions.material.measurement,
      unit_id: dataActions.material.unit_id,
      activite_id: dataActions.activityId,
      type_id: dataActions.type_id,
    };
    const url = `${this.API_HOST}/generals/admin/action`;
    return this.http
      .post(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() )
      .catch(this.handleError);
  }

  public createExpense(dataExpense: Expense): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/financingExpense`;
    return this.http
      .post(url, dataExpense, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public createProjectWithProgram(idProgram: string, strName: string): Promise<any> {
    let data: object;
    data = {
      id_program: idProgram,
      name: strName
    };
    const url = `${this.API_HOST}/generals/admin/project`;
    return this.http
      .post(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  createIncome(dataIncome: Income): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/income`;
    return this.http
      .post(url, dataIncome, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public createProgram(dataProgram: Program): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/program`;
    return this.http
      .post(url, dataProgram, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public addActivity(strName: string, rolId: string, projectId: string): Promise<any> {
    let data: object;
    data = {
      name: strName,
      id_role: rolId,
      id_project: projectId,
    };
    const url = `${this.API_HOST}/generals/admin/activities`;
    return this.http
      .post(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  sendTaskFlowExecution(objeto: any): Promise<any> {
    const url = `${this.API_HOST}/execution/next/flow`;
    return this.http
      .post(url, objeto, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  sendOpenTaskFinanciero(objetoSend: any): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/nextSubtype`;
    return this.http
      .post(url, objetoSend, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  sendOpenTask(objetoSend: any): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/nextSubtype`;
    return this.http
      .post(url, objetoSend, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  sendOpenSpecialTask(objetoSend: any): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/nextSubtype`;
    return this.http
      .post(url, objetoSend, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  createOpenTaskFlowExecution(objeto: any): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/register`;
    return this.http
      .post(url, objeto, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any, error => error)
      .catch(this.handleError);
  }

  closeTaskFlowExecution(idTask: any): Promise<any> {
    const url = `${this.API_HOST}/execution/endTaskMeasurement/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any, error => error)
      .catch(this.handleError);
  }

  getProcedure(projectId: string): Promise<Procedure> {
    const url = `${this.API_HOST}/${this.PROJECTS_END_POINT}/${projectId}/edit`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToProcedure)
      .catch(this.handleError);
  }

  returnTask(task_id: string): any {
    const url = `${this.API_HOST}/back/task/${task_id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToProcedure)
      .catch(this.handleError);
  }

  ///////REGRESAR TAREA DE FINANCIERO A DIRECCION CAMBIO DE ESTADO
  returnTaskFinanciero(task_id: string): any {
    const url = `${this.API_HOST}/back/task/${task_id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToProcedure)
      .catch(this.handleError);
  }

  crearCertificado(task_id: string): any {
    const url = `${this.API_HOST}/generals/request/ct/${task_id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  enviarCertificado(task_id: string): any {
    const url = `${this.API_HOST}/generals/send/certificate/tradition/${task_id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  /////////cancelar Tarea de parte de Direccion
  cancelarTask(task_id: string): any {
    const url = `${this.API_HOST}/generals/cancel/process/task/map/property/${task_id}`; ////Modificar a servicio nueva
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  updateProcedure(procedure: Procedure): Promise<any> {
    const request: any = CuencaVerdeServiceObjectMapper.mapProcedureToRequest(procedure);
    const url = `${this.API_HOST}/${this.PROJECTS_END_POINT}/${procedure.id}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  public updateIncome(income: Income): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/income`;
    return this.http
      .put(url, income, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public updateAction(data: ObjectActions): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/action`;
    return this.http
      .put(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public updateAssociate(data: Asociado): Promise<any> {
    const url = `${this.API_HOST}/generals/associates/${data.id}`;
    return this.http
      .put(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public updateCategory(dataCategory: Categories): Promise<any> {
    let data: object;
    data = {
      name: dataCategory.name,
      category_id: dataCategory.id
    };
    const url = `${this.API_HOST}/generals/admin/category`;
    return this.http
      .put(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public updateProgram(dataProgram: Program): Promise<any> {
    let data: object;
    data = {
      name: dataProgram.name,
      program_id: dataProgram.id
    };
    const url = `${this.API_HOST}/generals/admin/program`;
    return this.http
      .put(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public updateExpense(expense: Expense): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/financingExpense/${expense.id}`;
    return this.http
      .put(url, expense, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public updateSeedCapital(seedCapital: SeedCapital): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/seedCapital/${seedCapital.id}`;
    return this.http
      .put(url, seedCapital, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public updateBudget(dataBudget: any): Promise<any> {
    let data: object;
    data = {
      contibution_detail_id: dataBudget.id,
      contribution_id: dataBudget.contributions_id,
      value: dataBudget.inversion.replace(/\./g, ''),
    };
    const url = `${this.API_HOST}/generals/financier/updateContributionDetail`;
    return this.http
      .post(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  deleteProcedure(id: string): Promise<any> {
    const url = `${this.API_HOST}/${this.PROJECTS_END_POINT}/${id}`;
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  getAllTasks(): Observable<Task[]> {
    return this.getTasks()
      .flatMap(tasks => this.getOpenTasks(tasks))
      .catch(this.handleError);
  }

  private getTasks(): Observable<Task[]> {
    const url = `${this.API_HOST}/${this.TASKS_END_POINT}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .map(CuencaVerdeServiceObjectMapper.mapResponseToTasksArray);
  }

  private getCartasIntencion(tasks: Array<Task>): Observable<Task[]> {
    const url = `${this.API_HOST}/${this.CARTA_INTENCION_END_POINT}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .map(cartasIntencion => {
        const cartasIntencionObjects = CuencaVerdeServiceObjectMapper.mapResponseToTasksArray(cartasIntencion);
        tasks = tasks.concat(cartasIntencionObjects);
        return tasks;
      });
  }

  private getOpenTasks(tasks: Array<Task>): Observable<Task[]> {
    tasks = tasks.map(task => {
      if (task.process && task.process instanceof Array && task.process.length > 0) {
        task.process = task.process[0];
      }
      return task;
    });
    const url = `${this.API_HOST}/${this.OPEN_TASKS_END_POINT}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .map(openTasks => {
        const openTasksObjects = CuencaVerdeServiceObjectMapper.mapResponseToTasksArray(openTasks);
        tasks = tasks.concat(openTasksObjects);
        return tasks;
      });
  }

  getProjectTasks(projectId: string): Promise<Array<Task>> {
    const url = `${this.API_HOST}/generals/consultTasksByProject/${projectId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Task>)
      .catch(this.handleError);
  }

  getProjectAllTasks(projectId: string): Promise<any> {
    const url = `${this.API_HOST}/tasks/process/with/property/${projectId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getProcedureDetailsNew(idProcedure: string): Promise<any> {
    const url = `${this.API_HOST}/generals/processDetail/${idProcedure}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public getProjectDetail(idProject: string): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/project/${idProject}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => reject(error));
  }

  getCentroDeCostos(objetoFechas: any): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('from', String(objetoFechas.from));
    formData.append('to', String(objetoFechas.to));

    const url = `${this.API_HOST}/generals/financier/getLoadExcelClasificate`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getPrediosReales(): Promise<any> {
    const url = `${this.API_HOST}/potential/consult/all/properties/approved`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getActionsList(): Promise<Array<ActionData>> {
    const url = `${this.API_HOST}/generals/actionall/formaterial`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<ActionData>)
      .catch(this.handleError);
  }

  getParentProcedures(): Promise<any> {
    const url = `${this.API_HOST}/generals/getParentProcess`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  createTask(task: Task, users: any, speciesList: any, numberMonth: any, valuePerMonth: any): Promise<CuencaCreateTaskResponse> {
    const request: any = CuencaVerdeServiceObjectMapper.mapTaskToRequest(task, users, speciesList);
    request.numberMonth = numberMonth;
    request.valuePerMonth = valuePerMonth;
    const url = `${this.API_HOST}/${this.TASKS_END_POINT}`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  asignarAsociados(objeto: any): Promise<any> {
    const url = `${this.API_HOST}/commandand/action_budget/associated`;
    return this.http
      .post(url, objeto, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getTask(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/${this.TASKS_END_POINT}/${taskId}/edit`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTask)
      .catch(this.handleError);
  }

  public getDataCategory(categoryId: string): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/category/${categoryId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public getDataContributor(contributorId: string): Promise<any> {
    const url = `${this.API_HOST}/generals/associates/${contributorId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  public getDataProgram(programId: string): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/program/${programId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error));
  }

  getTypeContractorPool(): Promise<any> {
    const url = `${this.API_HOST}/generals/typecontracts`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getFilesContractor(contractor: Contractor): Promise<any> {
    const url = `${this.API_HOST}/${this.CONSULT_FILES}/${String(contractor.id)}/${String(contractor.id)}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getProcedureTasksAndPredio(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/tasks/process/with/property/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getInterventionProcess(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/users/intervention/process/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getCartaIntencionForEdit(cartaIntencionId: string): Promise<any> {
    const id = cartaIntencionId.substring(0, 2);
    const url = `${this.API_HOST}/${this.CARTA_INTENCION_END_POINT}/${id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTask)
      .catch(this.handleError);
  }

  getOpenTaskForEdit(openTaskId: string): Promise<any> {
    const id = openTaskId.substring(0, 2);
    const url = `${this.API_HOST}/${this.OPEN_TASKS_END_POINT}/${id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTask)
      .catch(this.handleError);
  }

  updateCartaIntencion(task: Task, users: any): Promise<any> {
    const request: any = CuencaVerdeServiceObjectMapper.mapTaskToRequest(task, users, null);
    const url = `${this.API_HOST}/${this.CARTA_INTENCION_END_POINT}/${task.id}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  updateTask(task: Task, users: any): Promise<any> {
    const request: any = CuencaVerdeServiceObjectMapper.mapTaskToRequest(task, users, null);
    const url = `${this.API_HOST}/${this.TASKS_END_POINT}/${task.id}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  deleteTask(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/${this.TASKS_END_POINT}/${taskId}`;
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  deletePredioPotencial(idPredio: string): Promise<any> {
    const url = `${this.API_HOST}/potential/delete/${idPredio}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getTaskTypes(procedureId: number): Promise<any> {
    const url = `${this.API_HOST}/generals/typeTaskByActivity/${procedureId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTaskTypes)
      .catch(this.handleError);
  }

  getTaskTypesEdit(procedureId: number): Promise<any> {
    const url = `${this.API_HOST}/generals/typeTaskByActivity/process/${procedureId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTaskTypes)
      .catch(this.handleError);
  }

  getRolesAll(): Promise<Array<Role>> {
    const url = `${this.API_HOST}/generals/consultRoleContractorGuard`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Role>)
      .catch(this.handleError);
  }

  public getRols(): Promise<Array<RoleClass>> {
    const url = `${this.API_HOST}/generals/admin/rolCordinator`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<RoleClass>)
      .catch(this.handleError);
  }

  getRoles(): Promise<Array<Role>> {
    const url = `${this.API_HOST}/generals/admin/rol`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Role>)
      .catch(this.handleError);
  }

  getOpenRoles(): Promise<Array<Role>> {
    const url = `${this.API_HOST}/generals/all/roles`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Role>)
      .catch(this.handleError);
  }

  getRolesEquipo(): Promise<Array<Role>> {
    const url = `${this.API_HOST}/generals/consultRoleTeamGuard`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Role>)
      .catch(this.handleError);
  }

  getAllUsers(): Promise<Array<User>> {
    const url = `${this.API_HOST}/generals/admin/user`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<User>)
      .catch(this.handleError);
  }

  getUsers(rolId: number): Promise<Array<User>> {
    const url = `${this.API_HOST}/generals/user/${rolId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<User>)
      .catch(this.handleError);
  }

  public getUsersForAdmin(idUser: string): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/user/${idUser}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getActionsByPoolId(poolId: string): Promise<Array<ActionByPool>> {
    const url = `${this.API_HOST}/generals/activities/pool/${poolId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<ActionByPool>)
      .catch(this.handleError);
  }

  getActivitiesValueByContractor(poolId: string): Promise<Array<ActivityValueByContractor>> {
    const url = `${this.API_HOST}/generals/detailactivities/pool/${poolId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<ActivityValueByContractor>)
      .catch(this.handleError);
  }

  getPossibilityCreateTask(idTask: number): Promise<any> {
    const url = `${this.API_HOST}/execution/validateSubtypeOn/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getPossibilitySendFinancial(idTask: number): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/verifiedFiles/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  uploadFiles(taskId: string, fileList: Array<File>): Promise<any> {
    const url = `${this.API_HOST}/loadFiles`;
    const formData = new FormData();
    formData.append('task_id', taskId);
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        formData.append('files[]', file, file.name);
      }
    }
    return this.http
      .post(url, formData, {headers: this.cuencaHeadersUpload})
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  makeFileRequestPredio(idPredio: string, fileList: Array<File>, progressListener: any, type_file: string): Promise<any> {
    const url = `${this.API_HOST}/potential/property/file`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('potential_property_id', String(idPredio));
      formData.append('type_file', String(type_file));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files[]', fileList[i], fileList[i].name);
      }
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressListener(progress);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestAnexos(idFile: string, fileList: Array<File>, progressListener: any, comment: string): Promise<any> {
    const url = `${this.API_HOST}/generals/load/files/attachment`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('file_id', String(idFile));
      formData.append('comment', String(comment));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files[]', fileList[i], fileList[i].name);
      }
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressListener(progress);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestBaseDocumento(fileList: File, typeDocument: string): Promise<any> {
    const url = `${this.API_HOST}/generals/task/insertDocument/${typeDocument}`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('file', fileList, fileList.name);

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestCentroDeCostos(fileList: File): Promise<any> {
    const url = `${this.API_HOST}/generals/financier/loadExcel`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('file', fileList, fileList.name);

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestSendFilePool(fileContractor: FileContractor): Promise<any> {
    const url = `${this.API_HOST}/pool/actions/contract`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('type_contract', fileContractor.type_contract);
      formData.append('type_file', fileContractor.type_file);
      formData.append('pool_id', fileContractor.pool_id);
      formData.append('file', fileContractor.file, fileContractor.file.name);

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestOpenTask(taskId: string, fileList: Array<File>, progressListener: any, typeFile: string): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/insertDocument`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('task_id', String(taskId));
      formData.append('type', String(typeFile));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files[]', fileList[i], fileList[i].name);
      }
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressListener(progress);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestRecursoHidricoEditedExcel(taskId: string, fileList: Array<File>, progressListener: any, typeFile: string): Promise<any> {
    const url = `${this.API_HOST}/generals/taskOpen/insertDocument`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('task_id', String(taskId));
      formData.append('type', String(typeFile));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files[]', fileList[i], fileList[i].name);
      }
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressListener(progress);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequest(taskId: Task, fileList: Array<File>, progressListener: any, type_file: string): Promise<any> {
    const url = `${this.API_HOST}/generals/loadFiles`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('task_id', String(taskId.id));
      formData.append('subType_id', String(taskId.sub_type.id));
      formData.append('type_file', String(type_file));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files[]', fileList[i], fileList[i].name);
      }
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressListener(progress);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  makeFileRequestContratista(user_id: string, fileList: Array<File>, progressListener: any, type_file: string): Promise<any> {
    const url = `${this.API_HOST}/generals/loadFiles`;
    return Observable.create((observer: Observer<any>) => {
      const formData: FormData = new FormData();
      formData.append('user_id', String(user_id));
      formData.append('type_file', String(type_file));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files[]', fileList[i], fileList[i].name);
      }
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);
        progressListener(progress);
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  getGuardaCuencaMonthlyQuota(userId: string): Promise<any> {
    const url = `${this.API_HOST}/users/quota/${userId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateGuardaCuencaMonthlyQuota(idG: string, quote: string): Promise<any> {
    const request = {
      'user_quota': quote,
      'user_id': idG
    };
    const url = `${this.API_HOST}/users/quota/${idG}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeadersJson})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public updateUser(dataUser: any): Promise<any> {
    let strPassword: any;
    if (!dataUser.hasOwnProperty('pass')) {
      strPassword = null;
    } else if (dataUser.pass) {
      strPassword = dataUser.pass;
    } else {
      strPassword = null;
    }

    const request = {
      names: dataUser.names,
      last_names: dataUser.last_names,
      email: dataUser.email,
      password: strPassword,
      rol_id: dataUser.rol_id,
      user_id: dataUser.id
    };
    const url = `${this.API_HOST}/generals/admin/user`;
    return this.http
      .put(url, request, {headers: this.cuencaHeadersJson})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  sendMap(taskId: string, budget: any, map: GeoJson) {
    const request = {
      geojson: JSON.stringify(map),
      budget: budget,
      task_id: taskId
    };
    return this.http
      .post(`${this.API_HOST}/maps/task/geojson`, request, {headers: this.cuencaHeadersJson})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  sendMapOpenTask(taskId: string, map: GeoJson) {
    const request = {
      geojson: map,
      task_id: taskId
    };
    return this.http
      .post(`${this.API_HOST}/generals/taskOpen/GeoMap`, request, {headers: this.cuencaHeadersJson})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  sendMapTaskExecution(taskId: string, map: GeoJson) {
    const request = {
      geojson: JSON.stringify(map),
      task_id: taskId
    };
    return this.http
      .post(`${this.API_HOST}/execution/GeoMap`, request, {headers: this.cuencaHeadersJson})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  sendPotencialPredio(predio: any) {
    return this.http
      .post(`${this.API_HOST}/potential/property`, predio, {headers: this.cuencaHeadersJson})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  removeFile(id: string, type: string): any {
    const formData: FormData = new FormData();
    formData.append('id_file', String(id));
    formData.append('type_file', String(type));
    const url = `${this.API_HOST}/file/delete`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  removeFileOpenTask(id: string): any {
    const formData: FormData = new FormData();
    formData.append('id_file', String(id));
    const url = `${this.API_HOST}/generals/taskOpen/deleteFile/${id}`;
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  removeFilePotential(idPredio: string, idFile: string, type: string): any {
    const formData: FormData = new FormData();
    formData.append('potential_id', String(idPredio));
    formData.append('id_file', String(idFile));
    formData.append('type_file', String(type));
    const url = `${this.API_HOST}/potential/delete/file`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getFiles(task: Task): Promise<any> {
    const url = `${this.API_HOST}/${this.CONSULT_FILES}/${String(task.id)}/${String(task.sub_type ? task.sub_type.id : 0)}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getDocumentAttachment(document: Documents): Promise<Array<Anexo>> {
    const url = `${this.API_HOST}/generals/load/files/attachment/${document.id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Anexo>)
      .catch(this.handleError);
  }

  deleteAttachedFile(id: string): any {
    const url = `${this.API_HOST}/generals/load/files/attachment/${id}`;
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getFilesOpentask(task: Task): Promise<Array<any>> {
    const url = `${this.API_HOST}/generals/taskOpen/getFile/${task.id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getOpenTaskImages(task: Task): Promise<Array<any>> {
    const url = `${this.API_HOST}/generals/filesFor/Forms/${task.id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getListFormDataComunication(idTask: String): Promise<any> {
    const url = `${this.API_HOST}/generals/formComunication/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getDataDocumentTaskPredio(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/consult/files/process/potential/property/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPropertyOwnership(propertyId: string): Promise<Array<PropertyOwnership>> {
    const url = `${this.API_HOST}/generals/getotherDMinute/forProperty/${propertyId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<PropertyOwnership>)
      .catch(this.handleError);
  }

  getPropertyOwnershipByTaskId(taskId: string): Promise<PropertyOwnership> {
    const url = `${this.API_HOST}/generals/getotherDMinute/forTask/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as PropertyOwnership)
      .catch(this.handleError);
  }

  savePropertyOwnership(propertyId: string, propertyOwnership: Array<PropertyOwnership>): Promise<any> {
    const request = {
      data: propertyOwnership,
      property_id: propertyId
    };
    const url = `${this.API_HOST}/generals/addMinute/otherData`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  public createUser(dataUser: User): Promise<any> {
    const request = {
      names: dataUser.names,
      last_names: dataUser.last_names,
      email: dataUser.email,
      password: dataUser.pass,
      rol_id: dataUser.rol_id['id'],
    };
    const url = `${this.API_HOST}/generals/admin/user`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getFilesContractorPool(idPool: string): Promise<any> {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_END_POINT}/contract/${String(idPool)}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getCostByPoolId(idPool: string): Promise<any> {
    const url = `${this.API_HOST}/generals/first_report/budget/${String(idPool)}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getThirdBudgetByPoolId(idPool: string): Promise<any> {
    const url = `${this.API_HOST}/generals/second_report/budget/${String(idPool)}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  existThirdBudget(idPool: string): Promise<any> {
    const url = `${this.API_HOST}/generals/budgetExecution/validatePool/${String(idPool)}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getContractModality(): Promise<any> {
    const url = `${this.API_HOST}/generals/modality/contractor`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getMaterials(): Promise<any> {
    const url = `${this.API_HOST}/category_all`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getActionsAll(): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/action`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getActionById(idActions: string): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/action/${idActions}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error.json()));
  }

  servOneSignal(ID_OneSignal: string): Promise<any> {

    const formData: FormData = new FormData();
    formData.append('player_id', String(ID_OneSignal));
    const url = `${this.API_HOST}/generals/getPlayerId`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  loadZipShapeProperties(JsonP: any): Promise<any> {
    const url = `${this.API_HOST}/generals/propertyManagement`;
    return this.http
      .post(url, JsonP, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);

  }

  insertAssociatedPerProcess(request: any): Promise<any> {
    const url = `${this.API_HOST}/generals/originOfResources`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getContractorsCategorias(): Promise<any> {
    const url = `${this.API_HOST}/category_all`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getAllCategories(): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/category`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getAllAssociates(): Promise<any> {
    const url = `${this.API_HOST}/generals/associates`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error.json()));
  }

  public getAllUnitsMeasure(): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/unitsMeasure`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(response => reject(response.json()));
  }

  getContractType(): Promise<any> {
    const url = `${this.API_HOST}/generals/type/contractor`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTaskForExecution(): Promise<any> {
    const url = `${this.API_HOST}/execution/consult/pool/actions/contractor`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getGuarantee(): Promise<any> {
    const url = `${this.API_HOST}/${this.CONSULT_FILES}/`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTaskDetails(taskId: string): Promise<Task> {
    const url = `${this.API_HOST}/${this.TASKS_END_POINT}/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTask)
      .catch(this.handleError);
  }

  loadCapaGestionPredial(): Promise<Task> {
    const url = `${this.API_HOST}/temporal/data.json`;
    const headers = this.cuencaHeaders;
    headers.append("Access-Control-Allow-Origin", "*");
    return this.http
      .get(url, {headers: headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getTaskDetailsOpen(taskId: string): Promise<Task> {
    const url = `${this.API_HOST}/${this.OPEN_TASKS_END_POINT}/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTask)
      .catch(this.handleError);
  }

  getTaskHistory(): Promise<any> {
    const url = `${this.API_HOST}/generals/task/history/intervention/user`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////filtrar aportes
  filterAporte(objeto: any): Promise<any> {
    const url = `${this.API_HOST}/commandand/filter/${objeto.directive_filter}/${objeto.id_objeto}/${objeto.year}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToTask)
      .catch(this.handleError);
  }


  getGeoJsonByProcedure(procedure: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/process/${procedure}/geojson`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getGeoJsonByExecutionTask(idTask: string): Promise<any> {
    const url = `${this.API_HOST}/execution/getMap/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getActionHash(hash: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/${hash}/geojson/action/material`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getMonitoreosCalendar(): Promise<any> {
    const url = `${this.API_HOST}/monitoring`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getContractorDetails(contract_id: string): Promise<Contractor> {
    const url = `${this.API_HOST}/users/${contract_id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToContractor)
      .catch(this.handleError);
  }

  getAllAssociated(): Promise<any> {
    const url = `${this.API_HOST}/commandand/allassociated`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAsociadosPerProcess(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/associateforBudget/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getOriginResources(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/shearOriginResource/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAllAportes(): Promise<any> {
    const url = `${this.API_HOST}/commandand/budgets`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAllMetas(): Promise<any> {
    const url = `${this.API_HOST}/commandand/goalReadAll`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAportesEspecie(idAporte: string): Promise<any> {
    const url = `${this.API_HOST}/commandand/goalReadAll`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getAporteForId(idAporte: string): Promise<any> {
    const url = `${this.API_HOST}/commandand/detailbudget/${idAporte}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteProject(idProject: string): Promise<any> {
    /*
    const formData: FormData = new FormData();
    formData.append('budget', String(aporte.aporte));
    formData.append('associated_id', String(aporte.asociado_id));
    formData.append('project_activity_id', String(aporte.activity_id));
    formData.append('type', String(aporte.type));
    formData.append('budget_species', String(aporte.budget_species));
    formData.append('species_contribution', String(aporte.species_contribution));
    */
    const url = `${this.API_HOST}/commandand/insert`;
    return this.http
      .post(url, idProject, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  deleteActivity(idActivity: string): Promise<any> {
    /*
    const formData: FormData = new FormData();
    formData.append('budget', String(aporte.aporte));
    formData.append('associated_id', String(aporte.asociado_id));
    formData.append('project_activity_id', String(aporte.activity_id));
    formData.append('type', String(aporte.type));
    formData.append('budget_species', String(aporte.budget_species));
    formData.append('species_contribution', String(aporte.species_contribution));
    */
    const url = `${this.API_HOST}/commandand/insert`;
    return this.http
      .post(url, idActivity, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertProject(project: Project, idProgram: string): Promise<any> {
    /*
    const formData: FormData = new FormData();
    formData.append('budget', String(aporte.aporte));
    formData.append('associated_id', String(aporte.asociado_id));
    formData.append('project_activity_id', String(aporte.activity_id));
    formData.append('type', String(aporte.type));
    formData.append('budget_species', String(aporte.budget_species));
    formData.append('species_contribution', String(aporte.species_contribution));
    */
    const url = `${this.API_HOST}/commandand/insert`;
    return this.http
      .post(url, project, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertActionGoodPracticesBudget(objetoSend: any): Promise<any> {
    const url = `${this.API_HOST}/generals/actionsgp`;
    return this.http
      .post(url, objetoSend, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public createCategory(data: any): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/category`;
    return this.http
      .post(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => reject(error));
  }

  public createAssociated(data: Asociado): Promise<any> {
    const url = `${this.API_HOST}/generals/associates`;
    return this.http
      .post(url, data, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => reject(error));
  }

  insertAssociated(aporte: Aporte): Promise<any> {
    const aporteJSON = {
      'budget': aporte.aporte.replace(/\./g, ''),
      'associated_id': aporte.asociado_id,
      'project_activity_id': aporte.activity_id,
      'type': aporte.type,
      'budget_species': aporte.budget_species,
      'species_contribution': aporte.species_contribution,
      'year': aporte.year
    };
    const url = `${this.API_HOST}/commandand/insert`;
    return this.http
      .post(url, aporteJSON, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertActivityByProject(activity: Activity, idProject: string): Promise<any> {
    /*
    const formData: FormData = new FormData();
    formData.append('budget', String(aporte.aporte));
    formData.append('associated_id', String(aporte.asociado_id));
    formData.append('project_activity_id', String(aporte.activity_id));
    formData.append('type', String(aporte.type));
    formData.append('budget_species', String(aporte.budget_species));
    formData.append('species_contribution', String(aporte.species_contribution));
    */
    const url = `${this.API_HOST}/commandand/insert`;
    return this.http
      .post(url, activity, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  updateAporte(aporte: AporteList): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('budget', String(aporte.budget));
    formData.append('paid_budget', String(aporte.paid_budget));
    formData.append('type', String(aporte.type));
    formData.append('budget_species', String(aporte.budget_species));
    formData.append('species_contribution', String(aporte.species_contribution));
    formData.append('id', String(aporte.id));
    const url = `${this.API_HOST}/commandand/update`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  traslateAporte(objeto: any): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('id', String(objeto.id));
    formData.append('budget_traslate', String(objeto.budget_traslate));
    formData.append('activity_traslate', String(objeto.activity_traslate));
    const url = `${this.API_HOST}/commandand/transaction`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getCommentbyIdTask(task: Task): Promise<Array<Comments>> {
    const url = `${this.API_HOST}/commentsbyTask/${task.id}/33`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Comments>)
      .catch(this.handleError);
  }

  isBudgetContractor(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/budgetContractor/validate/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  hasStardForm(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/form/stard/process/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  isBudgetFinal(idProcess: string): Promise<any> {
    const url = `${this.API_HOST}/generals/budgetExecution/validate/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getOpenTaskComments(idTask: string): Promise<Array<Comments>> {
    const url = `${this.API_HOST}/generals/getComments/2/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Comments>)
      .catch(this.handleError);
  }

  getAllCommentsExecutionTask(idTask: string): Promise<Array<Comments>> {
    const url = `${this.API_HOST}/generals/getComments/1/${idTask}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Comments>)
      .catch(this.handleError);
  }

  getDataReportGerencial(): Promise<any> {
    const url = `${this.API_HOST}/generals/managementreport`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getCommentByMonitoreoId(monitoreoDetail: MonitoreoDetail): Promise<Array<Comments>> {
    const url = `${this.API_HOST}/commentsbyTask/${monitoreoDetail.id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Comments>)
      .catch(this.handleError);
  }

  getTypeMonitor(): Promise<Array<MonitoreoTypes>> {
    const url = `${this.API_HOST}/generals/type/monitoring`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getSurvey(taskId: string): Promise<Property> {
    const url = `${this.API_HOST}/tasks/property/info/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getSurveyByPredio(predioId: string): Promise<Property> {
    const url = `${this.API_HOST}/potential/consult/poll/${predioId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getMonitorFromId(id: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/${id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getMonitorFromIdCalendar(id: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/${id}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getBudget(taskId: number): Promise<Array<Budget>> {
    const url = `${this.API_HOST}/tasks/consultBudgetByTask/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Budget>)
      .catch(this.handleError);
  }

  getBudgetFromProcess(idProcess: number): Promise<any> {
    const url = `${this.API_HOST}/generals/budgetRestoration/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Budget>)
      .catch(this.handleError);
  }

  getBudgetFromProcessContractor(idProcess: number): Promise<any> {
    const url = `${this.API_HOST}/generals/budgetContractorRestoration/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Budget>)
      .catch(this.handleError);
  }

  getBudgetFromProcessExecution(idProcess: number): Promise<any> {
    const url = `${this.API_HOST}/generals/budgetExecutionRestoration/${idProcess}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Budget>)
      .catch(this.handleError);
  }

  getAllBudgets(): Promise<any> {
    const url = `${this.API_HOST}/tasks/consult/budget/all`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<BudgetListItem>)
      .catch(this.handleError);
  }

  getDocumentsPredio(idPredio: string): Promise<any> {
    const url = `${this.API_HOST}/potential/consult/files/${idPredio}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  approveTask(taskId: string): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(taskId));
    const url = `${this.API_HOST}/approved`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  sendPredioFlow(idPredio: string, recUserId: string): any {
    const formData: FormData = new FormData();
    formData.append('potential_id', String(idPredio));
    formData.append('recUserId', String(recUserId));
    const url = `${this.API_HOST}/potential/property/approved`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  sendPredioFlowEnd(idPredio: string): any {
    const url = `${this.API_HOST}/potential/finalized/${idPredio}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  backPredioFlow(idPredio: string): any {
    const url = `${this.API_HOST}/potential/property/back/${idPredio}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  selectPredioUser(idPredio: string): any {
    const url = `${this.API_HOST}/potential/property/select/${idPredio}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  aproveTaskCooA(taskId: string, userId: string): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(taskId));
    formData.append('user_id', String(userId));
    const url = `${this.API_HOST}/generals/send/task/firm/guardTeam`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

////////////////////////////INSERTAR MONITOREO
  crearMonitor(monitoreo: Monitoreo): any {
    const formData: FormData = new FormData();
    formData.append('date_start', String(monitoreo.date_start));
    formData.append('date_deadline', String(monitoreo.date_deadline));
    formData.append('task_id', String(monitoreo.task_id));
    formData.append('type_monitoring_id', String(monitoreo.type));
    formData.append('comment', String(monitoreo.comment));
    const url = `${this.API_HOST}/monitoring`;    ////////RUTA INSERT MONITOREOS
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////////////////////////INSERTAR MONITOREO
  crearMetas(meta: MetasAporte): any {
    const formData: FormData = new FormData();
    formData.append('unit', String(meta.unit));
    formData.append('description', String(meta.description));
    formData.append('quantity', String(meta.quantity));
    formData.append('contributions_id', String(meta.contributions_id));
    const url = `${this.API_HOST}/commandand/goalInsert`;    ////////RUTA INSERT MONITOREOS
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  crearMonitorCalendar(monitoreo: any): any {
    const formData: FormData = new FormData();
    formData.append('title', String(monitoreo.title));
    formData.append('date_start', String(monitoreo.start));
    formData.append('date_deadline', String(monitoreo.end));
    formData.append('type_monitoring_id', String(monitoreo.type));
    formData.append('comment', String(monitoreo.comentario));
    formData.append('user_id', String(monitoreo.usuario));
    formData.append('process_id', String(monitoreo.procedure));
    formData.append('hash', String(monitoreo.hash));
    const url = `${this.API_HOST}/monitoring/process`;    ////////RUTA INSERT MONITOREOS
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  crearExecutionTask(objeto: any): any {
    const url = `${this.API_HOST}/execution/task`;    ////////RUTA INSERT task execution
    return this.http
      .post(url, objeto, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  createDetailService(objeto: DetailsBudgets): any {

    const dataSend = {
      'contribution_id': objeto.associated.contribution_id,
      'associated_id': objeto.associated.associate_id,
      'detail_id': objeto.detail,
      'value': objeto.value.replace('.', ''),
      'quantity': objeto.quantity,
      'dedication': objeto.dedication,
      'unit_measurement': objeto.unit_measurement,
      'quantity_measurement': objeto.quantity_measurement,
      'benefic_factor': objeto.benefit_factor,
      'value_unit': objeto.value_unit.replace('.', ''),
      'year': +objeto.year
    };

    const url = `${this.API_HOST}/generals/financier/insertContribution`;    ////////RUTA INSERT detail budget
    return this.http
      .post(url, dataSend, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  reasignDetailService(objeto: DetailsBudgets, idFrom: String): any {

    const dataSend = {
      'contribution_id': objeto.associated.contribution_id,
      'associated_id': objeto.associated.associate_id,
      'detail_id': objeto.detail,
      'value': objeto.value.replace('.', ''),
      'quantity': objeto.quantity,
      'dedication': objeto.dedication,
      'unit_measurement': objeto.unit_measurement,
      'quantity_measurement': objeto.quantity_measurement,
      'benefic_factor': objeto.benefit_factor,
      'value_unit': objeto.value_unit.replace('.', ''),
      'year': +objeto.year,
      'to_contibution_detail_id': +idFrom,
      'form_contibution_detail_id': objeto.detail,
    };

    const url = `${this.API_HOST}/generals/financier/transactionDetail`;
    return this.http
      .post(url, dataSend, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  updateMonitorCalendar(monitoreo: any): any {
    const request: any = {};
    request.title = String(monitoreo.title);
    request.date_start = String(monitoreo.start);
    request.date_deadline = String(monitoreo.end);
    request.type_monitoring_id = String(monitoreo.type);
    request.comment = String(monitoreo.comentario);
    request.user_id = String(monitoreo.usuario);
    request.proccess_id = String(monitoreo.procedure);
    request.hash = String(monitoreo.hash);
    const url = `${this.API_HOST}/monitoring/${monitoreo.id}`;    ////////RUTA UPDATE MONITOREOS
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

////////////////////////////GET MONITOREOs
  getMonitoreos(task_id: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/process/task/${task_id}`; ////////RUTA GET MONITOREOS
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////////////////////////GET List Program ALL
  getListProjectsAll(): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/project`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////////////////////////GET List Program
  getListProjects(idProgram: string): Promise<any> {
    const url = `${this.API_HOST}/execution/${idProgram}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////////////////////////GET List Actions Good Practices
  getActionsGoodPractices(): Promise<any> {
    const url = `${this.API_HOST}/generals/actionsgp`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getListUsers(): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/user`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getListPrograms(): Promise<any> {
    const url = `${this.API_HOST}/generals/admin/program`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////////////////////////GET execution task
  getExecutionTask(): Promise<any> {
    const url = `${this.API_HOST}/execution`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => {
        return response.json() as Array<any>;
      })
      .catch(this.handleError);
  }

  ////////////////////////////GET execution task
  getExecutionTaskById(idExecution: string): Promise<any> {
    const url = `${this.API_HOST}/execution/${idExecution}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  ////////////////////////////GET Task Overcome (Proximas a vencer)
  getTaskOvercome(): Promise<any> {
    const url = `${this.API_HOST}/tasks/soon/overcome`; ////////
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getMonitoreoDetail(monitoreoId: string): Promise<MonitoreoDetail> {
    const url = `${this.API_HOST}/${this.MONITOREOS_END_POINT}/${monitoreoId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as MonitoreoDetail)
      .catch(this.handleError);
  }

  getCartaIntencion(predioId: string): Promise<any> {
    const url = `${this.API_HOST}/potential/consult/letter/${predioId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(this.handleError);
  }

  getCartaStard(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/monitoring/form/stard/process/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getMinuta(taskId: string): Promise<any> {
    const url = `${this.API_HOST}/generals/minute/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  /////////DELETE MONITOREO
  deleteMonitoreos(id: string): Promise<Array<Monitoreo>> {
    const url = `${this.API_HOST}/monitoring/${id}`; ////////RUTA DELETE MONITOREO
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  /////////DELETE METAS
  deleteMetas(id: string): Promise<Array<Monitoreo>> {
    const url = `${this.API_HOST}/monitoring/${id}`; ////////RUTA DELETE MONITOREO
    return this.http
      .delete(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertCommentsTask(comment: any): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(comment.task_id));
    formData.append('sub_type', String(comment.sub_type));
    formData.append('comment', String(comment.comment));
    const url = `${this.API_HOST}/generals/commentsbyTask`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertCommentExecutionTask(comment: any): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(comment.task_id));
    formData.append('type', String(comment.type));
    formData.append('description', String(comment.description));
    const url = `${this.API_HOST}/generals/addComments`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertCommentOpenTask(comment: any): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(comment.task_id));
    formData.append('type', String(comment.sub_type));
    formData.append('description', String(comment.comment));
    const url = `${this.API_HOST}/generals/addComments`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertCommentsPredio(comment: any): any {
    const formData: FormData = new FormData();
    formData.append('potential_id', String(comment.potential_id));
    formData.append('sub_type', String(comment.sub_type));
    formData.append('comment', String(comment.comment));
    const url = `${this.API_HOST}/potential/property/comment`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  editFormComunication(taskObjeto: any, taskId: string): any {
    const url = `${this.API_HOST}/generals/formComunication`;
    return Observable.create((observer: Observer<any>) => {

      const formData: FormData = new FormData();
      formData.append('form_id', taskObjeto.id);
      formData.append('task_id', taskObjeto.task_id);
      formData.append('type', '1');
      formData.append('basin', taskObjeto.basin);
      formData.append('municipality', taskObjeto.municipality);
      formData.append('sidewalk', taskObjeto.sidewalk);
      formData.append('objective_group', String(taskObjeto.objective_group));
      formData.append('date', taskObjeto.date);
      formData.append('associated_name', String(taskObjeto.associated_name));
      formData.append('number_attendees', String(taskObjeto.number_attendees));
      formData.append('number_trees', String(taskObjeto.number_trees));
      formData.append('experence_consolidated', String(taskObjeto.experence_consolidated));
      formData.append('experence_type', String(taskObjeto.experence_type));
      formData.append('event_name', String(taskObjeto.event_name));
      formData.append('asistent_list', String(taskObjeto.asistent_list));
      formData.append('registry_photographic', String(taskObjeto.registry_photographic));

      for (let i = 0; i < taskObjeto.images.length; i++) {
        formData.append('images[]', taskObjeto.images[i], taskObjeto.images[i].name);
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  insertFormComunicationWithImages(taskObjeto: FormComunication): Promise<any> {
    const url = `${this.API_HOST}/generals/formComunication`;
    return Observable.create((observer: Observer<any>) => {

      const formData: FormData = new FormData();
      formData.append('form_id', '0');
      formData.append('task_id', taskObjeto.task_id);
      formData.append('type', '1');
      formData.append('basin', taskObjeto.basin);
      formData.append('municipality', taskObjeto.municipality);
      formData.append('sidewalk', taskObjeto.sidewalk);
      formData.append('objective_group', String(taskObjeto.objective_group));
      formData.append('date', taskObjeto.date);
      formData.append('associated_name', String(taskObjeto.associated_name));
      formData.append('number_attendees', String(taskObjeto.number_attendees));
      formData.append('number_trees', String(taskObjeto.number_trees));
      formData.append('experence_consolidated', String(taskObjeto.experence_consolidated));
      formData.append('experence_type', String(taskObjeto.experence_type));
      formData.append('event_name', String(taskObjeto.event_name));
      formData.append('asistent_list', String(taskObjeto.asistent_list));
      formData.append('registry_photographic', String(taskObjeto.registry_photographic));

      for (let i = 0; i < taskObjeto.images.length; i++) {
        formData.append('images[]', taskObjeto.images[i], taskObjeto.images[i].name);
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              observer.next(JSON.parse(xhr.response));
            } catch (e) {
              console.log('makeFileRequest: ' + e);
            }
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.getAuthToken());
      xhr.send(formData);
    }).toPromise();
  }

  insertMonitoreoComment(comment: any): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(comment.task_id));
    formData.append('sub_type', String(comment.sub_type));
    formData.append('comment', String(comment.comment));
    const url = `${this.API_HOST}/generals/commentsbyMonitoreo`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  insertCommentMonitoreoCalendar(comment: any): any {
    const formData: FormData = new FormData();
    formData.append('monitoring_id', String(comment.monitoring_id));
    formData.append('comment', String(comment.comment));
    const url = `${this.API_HOST}/monitoring/comment`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  approveTaskSeguimiento(taskId: string): any {
    const formData: FormData = new FormData();
    formData.append('task_id', String(taskId));
    const url = `${this.API_HOST}/tasks/budget/approve`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getProgramProjects(programId: string): Promise<Array<Project>> {
    const url = `${this.API_HOST}/generals/programs/projects/${programId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Project>)
      .catch(this.handleError);
  }

  getProjectActivities(projectId: number): Promise<Array<Activity>> {
    const url = `${this.API_HOST}/generals/programs/projects/activities/${projectId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Activity>)
      .catch(this.handleError);
  }

  getRoleUser(): Promise<any> {
    const url = `${this.API_HOST}/role`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPoolsOfContracts(): Promise<Array<PoolOfContracts>> {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_END_POINT}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<PoolOfContracts>)
      .catch(this.handleError);
  }

  getPoolOfContracts(objectId: string): Promise<PoolOfContracts> {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_END_POINT}/${objectId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as PoolOfContracts)
      .catch(this.handleError);
  }

  getPoolOfContractsProcedures(poolId: string): Promise<Array<PoolOfContractsProcedure>> {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_PROCEDURES_END_POINT}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<PoolOfContractsProcedure>)
      .catch(this.handleError);
  }

  createPoolOfContracts(poolOfContracts: PoolOfContracts): Promise<CuencaCreateResponse> {
    const request: any = CuencaVerdeServiceObjectMapper.mapPoolOfContractsToRequest(poolOfContracts);
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_END_POINT}`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  updatePoolOfContracts(objeto: any): Promise<any> {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_END_POINT}/actions/contractor`;
    return this.http
      .post(url, objeto, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getContractors(): Promise<Array<Contractor>> {
    const url = `${this.API_HOST}/users/all/5`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Contractor>)
      .catch(this.handleError);
  }

  getContractor(objectId: string): Promise<Contractor> {
    const url = `${this.API_HOST}/users/${objectId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Contractor)
      .catch(this.handleError);
  }

  createContratista(contractor: Contractor): Promise<any> {
    const request: any = contractor;
    const url = `${this.API_HOST}/users`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  updateContractor(contractor: Contractor) {
    const request: any = contractor;
    const url = `${this.API_HOST}/users/${contractor.user.id}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  updateLetterOrSurvey(objeto: any) {
    const request: any = objeto;
    const url = `${this.API_HOST}/potential/update/letter/poll`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  updatePollPredio(encuesta: any) {
    const request: any = encuesta;
    const url = `${this.API_HOST}/potential/update/letter/poll`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  uploadCoordenadasPredio(objetoPredio: any) {
    const url = `${this.API_HOST}/potential/coordinate/update`;
    return this.http
      .put(url, objetoPredio, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getPredioById(predioId: string) {
    const url = `${this.API_HOST}/predio/${predioId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as PredioInfo)
      .catch(this.handleError);
  }

  sendSupplierEvaluationForm(monitorId: string, supplierEvaluation: SupplierEvaluation) {
    const formData: FormData = new FormData();
    const url = `${this.API_HOST}/monitoring/provider/evaluation/form/${monitorId}`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  getSupplierEvaluationForm(supplierId: String) {
    const url = `${this.API_HOST}/supplierForm/${supplierId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as SupplierEvaluation)
      .catch(this.handleError);
  }

  createPqrs(pqrs: PQRS) {
    const formData: FormData = new FormData();
    formData.append('card_id', pqrs.id_card);
    formData.append('contact_name', pqrs.name);
    formData.append('email', pqrs.email);
    formData.append('agreement_corporation', pqrs.conservation_agreement_corporation ? '1' : '0');
    formData.append('subcribe_agreement', pqrs.subscribe_agreement ? '1' : '0');
    formData.append('role_id', pqrs.dependency.id);
    formData.append('type_pqrs', pqrs.pqrsType.id);
    formData.append('description', pqrs.description);
    const url = `${this.API_HOST}/pqrs`;
    return this.http
      .post(url, formData, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  updatePqrs(pqrs: PQRS) {
    const request = {
      'role_id': pqrs.dependency.id,
      'type_pqrs': pqrs.pqrsType.id
    };
    const url = `${this.API_HOST}/comunication/pqrs/${pqrs.id}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  sendPqrsResponse(pqrs: PQRS) {
    const request = {
      'response': pqrs.response,
      'pqrs_id': pqrs.id
    };
    const url = `${this.API_HOST}/comunication/pqrs/response`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as CuencaCreateResponse)
      .catch(this.handleError);
  }

  getPqrs(pqrsId: String) {
    const url = `${this.API_HOST}/comunication/pqrs/${pqrsId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as PQRS)
      .catch(this.handleError);
  }

  getDependencies() {
    const url = `${this.API_HOST}/pqrs/dependencie`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<Dependency>)
      .catch(this.handleError);
  }

  getPqrsTypes() {
    const url = `${this.API_HOST}/type/pqrs`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<PQRSType>)
      .catch(this.handleError);
  }

  getAllPqrs() {
    const url = `${this.API_HOST}/comunication/pqrs`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<PQRS>)
      .catch(this.handleError);
  }

  getProceduresWithActionsForPoolForView(poolId: any) {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_PROCEDURES_END_POINT}/${poolId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<any>)
      .catch(this.handleError);
  }

  getProceduresWithActionsForPool() {
    const url = `${this.API_HOST}/${this.POOL_OF_CONTRACTS_PROCEDURES_END_POINT}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as Array<any>)
      .catch(this.handleError);
  }

  getPercentageData(procedureId: String) {
    const url = `${this.API_HOST}/${this.PROCEDURE_PERCENTAGE_END_POINT}/${procedureId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public getAllSeedCapital() {
    const url = `${this.API_HOST}/generals/financier/seedCapital`;
    return this.http
      .get(url, {headers: this.cuencaHeaders}).toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public getAllFinancingExpenses() {
    const url = `${this.API_HOST}/generals/financier/financingExpense`;
    return this.http
      .get(url, {headers: this.cuencaHeaders}).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  saveActionsByPoolChanges(actionByPool: Array<ActionByPool>) {
    const url = `${this.API_HOST}/${this.CONTRACTOR_ACTIONS_VALUES_END_POINT}`;
    return this.http
      .post(url, actionByPool, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  saveContractorActionsValues(contractorActionsValues: ActivityValueByContractor) {
    const url = `${this.API_HOST}/${this.CONTRACTOR_ACTION_VALUE_END_POINT}`;
    return this.http
      .post(url, contractorActionsValues, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  assignContractor(assignContractorRequest: AssignContractorRequest) {
    const url = `${this.API_HOST}/${this.ASSIGN_CONTRACTOR_TO_POOL_END_POINT}`;
    return this.http
      .post(url, assignContractorRequest, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getActivities(procedureId: string): Promise<Array<Activity>> {
    const url = `${this.API_HOST}/${this.ACTIVITIES_END_POINT}/${procedureId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToActivitiesArray)
      .catch(this.handleError);
  }

  public allActivities(): Promise<Array<any>> {
    const url = `${this.API_HOST}/generals/admin/activities`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error.json));
  }

  public getAllTypes(): Promise<Array<any>> {
    const url = `${this.API_HOST}/generals/admin/types`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(error => reject(error.json));
  }

  getHidricoErosivoFormData(taskId: string): Promise<Array<Activity>> {
    const url = `${this.API_HOST}/generals/filesFor/Forms/${taskId}`;
    return this.http
      .get(url, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  addNewActionsToPool(request: any) {
    const url = `${this.API_HOST}/${this.ADD_ACTIONS_TO_POOL_END_POINT}`;
    return this.http
      .put(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  saveUnforeseenPoolValue(poolId: any, value: any) {
    const request = {
      pool_id: poolId,
      value: value
    };
    const url = `${this.API_HOST}/${this.SAVE_UNFORESEEN_VALUE_TO_POOL_END_POINT}`;
    return this.http
      .post(url, request, {headers: this.cuencaHeaders})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
}
