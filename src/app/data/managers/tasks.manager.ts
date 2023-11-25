import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {BaseManager} from './base.manager';
import {CuencaVerdeService} from '../services/cuenca-verde.service';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Task} from '../model/task';
import {BaseObject} from '../model/base-object';
import {Subtype} from '../model/subtype';
import {Monitoreo} from '../model/monitoreo';
import {Budget} from '../model/budget';
import {MonitoreoTypes} from '../model/monitoreo_types';
import {Aporte} from '../model/aporte';
import {AporteList} from '../model/aporteList';
import {MetasAporte} from '../model/metasAporte';
import {MonitoreoDetail} from '../model/monitoreo-detail';
import {Procedure} from '../model/procedure';
import {Project} from '../model/project';
import {Activity} from '../model/activity';
import {DetailsBudgets} from '../model/details-budgets';
import {FileContractor} from '../model/fileContractor';
import GeoJson = geoJsonInterface.GeoJson;
import Comments = commentsInterface.Comments;
import HydrologicalSource = propertyInterface.HydrologicalSource;
import ElectricitySource = propertyInterface.ElectricitySource;
import CookingMethods = propertyInterface.CookingMethods;
import FamilyInformation = propertyInterface.FamilyInformation;
import BasicSanitationMethods = propertyInterface.BasicSanitationMethods;
import Anexo = anexoInterface.Anexo;
import Documents = documentsInterface.Documents;

@Injectable()
export class TasksManager extends BaseManager {

  constructor(private cuencaVerdeService: CuencaVerdeService) {
    super();
  }

  protected getAll(): Promise<Array<BaseObject>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllTasks()
        .subscribe(data => {
          data = data.filter((task: any) => {
            return task.sub_type.id + '' !== '3';
          });
          resolve(data);
        }, reject);
    });
  }

  public getCentroDeCostos(objetoFechas: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getCentroDeCostos(objetoFechas)
        .then((response: any) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  public deleteFilePoolContractor(idFile: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deleteFilePoolContractor(idFile)
        .then((response: any) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  makeFileRequestBaseDocumento(file: File, typeDocument: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.makeFileRequestBaseDocumento(file, typeDocument)
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }


  makeFileRequestCentroDeCostos(file: File) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.makeFileRequestCentroDeCostos(file)
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  sendFilePool(fileContractor: FileContractor) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.makeFileRequestSendFilePool(fileContractor)
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  getAllTaskFiles(task: Task): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getFiles(task)
        .then(tasks => resolve(tasks))
        .catch(reject);
    });
  }

  getDocumentAttachment(document: Documents): Promise<Array<Anexo>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getDocumentAttachment(document)
        .then(anexos => resolve(anexos as Array<Anexo>))
        .catch(reject);
    });
  }

  getAllOpenTaskFiles(task: Task): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getFilesOpentask(task)
        .then(tasks => resolve(tasks))
        .catch(reject);
    });
  }

  getOpenTaskImages(task: Task): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getOpenTaskImages(task)
        .then(images => resolve(images))
        .catch(reject);
    });
  }

  getBasePrediosDocument(typeDocument: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getBasePrediosDocument(typeDocument)
        .then(base => resolve(base))
        .catch(reject);
    });
  }

  getLastReport(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getLastReport()
        .then(base => resolve(base))
        .catch(reject);
    });
  }

  getActivitiesContributionFinancial(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActivitiesContributionFinancial()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getDetailBudgetFinancier(idDetail: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getDetailBudgetFinancier(idDetail)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getPromgramProjectDetailsBudget(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPromgramProjectDetailsBudget()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getListFormDataComunication(idTask: String): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getListFormDataComunication(idTask)
        .then(listForm => resolve(listForm.reverse()))
        .catch(reject);
    });
  }

  loadZipShapeProperties(JsonP: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.loadZipShapeProperties(JsonP)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  getDataDocumentTaskPredio(idProcess: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getDataDocumentTaskPredio(idProcess)
        .then(tasks => resolve(tasks))
        .catch(reject);
    });
  }

  getTotalForCordinations(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTotalForCordinations()
        .then((response: any) => resolve(response))
        .catch(reject);
    });
  }

  getAllAssociated(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllAssociated()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getAsociadosPerProcess(idProcess: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAsociadosPerProcess(idProcess)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getOriginResources(idProcess: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getOriginResources(idProcess)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  insertAssociatedPerProcess(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertAssociatedPerProcess(request)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  deleteProject(idProject: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deleteProject(idProject)
        .then((response: any) => {
          if (response.response_code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  deleteActivity(idActivity: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deleteProject(idActivity)
        .then((response: any) => {
          if (response.response_code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  insertProject(project: Project, idProgram: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertProject(project, idProgram)
        .then((response: any) => {
          if (response.response_code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  insertActionGoodPracticesBudget(objetoSend: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertActionGoodPracticesBudget(objetoSend)
        .then((response: any) => {
          if (response.response_code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  insertActivityByProject(activity: Activity, idProject: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertActivityByProject(activity, idProject)
        .then((response: any) => {
          if (response.response_code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  insertAssociated(aporte: Aporte): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertAssociated(aporte)
        .then((response: any) => {
          if (response.response_code === 500) {
            reject(response.message);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  updateAssociated(aporte: AporteList): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateAporte(aporte)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  traslateAporte(objeto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.traslateAporte(objeto)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getAllAportes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllAportes()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getAllMetas(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllMetas()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getAportesEspecies(idAporte: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAportesEspecie(idAporte)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getAporteForId(idAporte: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAporteForId(idAporte)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getModalityC(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getContractModality()
        .then(contractModality => resolve(contractModality))
        .catch(reject);
    });
  }

  getActionsAll(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActionsAll()
        .then(response => resolve(response))
        .catch(reject);
    });
  }


  getMaterials(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMaterials()
        .then(contractModality => resolve(contractModality))
        .catch(reject);
    });
  }

  servOneSignal(ID_OneSignal: string): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.servOneSignal(ID_OneSignal)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getContractorsCategorias(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getContractorsCategorias()
        .then(contractModality => resolve(contractModality))
        .catch(reject);
    });
  }

  getContractType(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getContractType()
        .then(ContractType => resolve(ContractType))
        .catch(reject);
    });
  }

  getTaskForExecution(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskForExecution()
        .then(ContractType => resolve(ContractType))
        .catch(reject);
    });
  }

  getGuarantee(): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getGuarantee()
        .then(guarantee => resolve(guarantee))
        .catch(reject);
    });
  }

  removeFileTask(id: string, type: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.removeFile(id, type)
        .then(() => resolve())
        .catch(reject);
    });
  }

  deleteAttachedFile(attachment: Anexo): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deleteAttachedFile(attachment.attach_id + '')
        .then(() => resolve())
        .catch(reject);
    });
  }

  removeFileTaskOpen(id: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.removeFileOpenTask(id)
        .then(() => resolve())
        .catch(reject);
    });
  }

  removeFilePotential(idPredio: string, idFile: string, type: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.removeFilePotential(idPredio, idFile, type)
        .then(() => resolve())
        .catch(reject);
    });
  }

  getTaskTypes(procedureId: number): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskTypes(procedureId)
        .then(taskTypes => {
          resolve(taskTypes);
        })
        .catch(reject);
    });
  }

  aproveTaskCooA(task_id: string, user_id: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.aproveTaskCooA(task_id, user_id)
        .then((response: any) => resolve(response))
        .catch(reject);
    });
  }

  getTaskTypesEdit(procedureId: number): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskTypesEdit(procedureId)
        .then(taskTypes => {
          resolve(taskTypes);
        })
        .catch(reject);
    });
  }

  protected addAll(objects: Array<Task>): void {
    const component = this;
    this.clearObjects();
    objects.forEach(function (task: Task) {
      component.retrieveInstance(String(task.route), task);
    });
  }

  getGeoJsonFromTaskId(taskId: string): Promise<GeoJson> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getGeoJson(taskId)
        .then(geoJson => {
          if (!(geoJson instanceof ErrorObservable)) {
            if (Number(taskId) > 0) {
              resolve(geoJson);
            }
          }
        })
        .catch(reject);
    });
  }

  getGeoJsonFromOpenTaskId(taskId: string): Promise<GeoJson> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getOpenTaskGeoJson(taskId)
        .then(geoJson => {
          if (!(geoJson instanceof ErrorObservable)) {
            if (Number(taskId) > 0) {
              if (geoJson.geojson && !geoJson.geojson.features) {
                geoJson.geojson = JSON.parse(geoJson.geojson); // TODO Wendy mayerly porque el servicio es inconsistente y devuelve objetos o strings a conveniencia
              }
              resolve(geoJson.geojson);
            }
          }
        })
        .catch(reject);
    });
  }

  getOpenTaskSamplesExcel(taskId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getExcelFromUrl('generals/taskOpen/dowloadSamples/' + taskId)
        .then(excel => {
          if (!(excel instanceof ErrorObservable)) {
            resolve(excel);
          }
        })
        .catch(reject);
    });
  }

  getGeoJsonFromTaskIdExecution(taskId: string): Promise<GeoJson> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getGeoJsonFromTaskIdExecution(taskId)
        .then(geoJson => {
          if (!(geoJson instanceof ErrorObservable)) {
            if (Number(taskId) > 0) {
              resolve(geoJson);
            }
          }
        })
        .catch(reject);
    });
  }

  public load(objectId: string): Promise<any> {
    if (objectId.includes('carta')) {
      return new Promise((resolve, reject) => {
        this.cuencaVerdeService.getCartaIntencionForEdit(objectId)
          .then(task => {
            task.startdate = task.startdate ? task.startdate.split(' ')[0] : '';
            task.deadline = task.deadline ? task.deadline.split(' ')[0] : '';
            const subType = new Subtype();
            subType.name = 'Carta de intención';
            task.sub_type = subType;
            task.route = task.id + '_carta';
            this.retrieveInstance(String(task.route), task);
            resolve(task);
          })
          .catch(reject);
      });
    } else if (objectId.includes('open')) {
      return new Promise((resolve, reject) => {
        this.cuencaVerdeService.getOpenTaskForEdit(objectId)
          .then(task => {
            task.startdate = task.startdate ? task.startdate.split(' ')[0] : '';
            task.deadline = task.deadline ? task.deadline.split(' ')[0] : '';
            const subType = new Subtype();
            subType.name = 'Tarea abierta';
            task.sub_type = subType;
            task.route = task.id + '_open';
            this.retrieveInstance(String(task.route), task);
            resolve(task);
          })
          .catch(reject);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.cuencaVerdeService.getTask(objectId)
          .then(task => {
            task.startdate = task.startdate ? task.startdate.split(' ')[0] : '';
            task.deadline = task.deadline ? task.deadline.split(' ')[0] : '';
            if (task.date_start) {
              task.startdate = task.date_start.split(' ')[0];
            }
            if (task.date_end) {
              task.deadline = task.date_end.split(' ')[0];
            }
            task.route = task.id;
            this.retrieveInstance(String(task.route), task);
            resolve(task);
          })
          .catch(reject);
      });
    }
  }

  create(task: Task, users: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createTask(task, users, null, null, null)
        .then(response => resolve(response));
    });
  }

  createTask(task: Task, users: any, speciesList: any, numberMonth: any, valuePerMonth: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createTask(task, users, speciesList, numberMonth, valuePerMonth)
        .then((response) => {
          task.id = response.object_id;
          task.sub_type = new Subtype();
          task.sub_type.id = response.sub_type_id;
          task.sub_type.name = response.sub_type_name;
          let key;
          if (task.taskType) {
            key = Number(task.taskType.id) === 5 ? String(task.id) + '_carta' : String(task.id);
          } else {
            key = task.open ? String(task.id) + '_open' : String(task.id);
          }
          this.pool = {};
          resolve(response);
        })
        .catch(reject);
    });
  }

  update(task: Task, users: any) {
    if (String(task.taskType.id) === '5') {
      return new Promise((resolve, reject) => {
        this.cuencaVerdeService.updateCartaIntencion(task, users)
          .then(success => {
            this.clearObjects();
            this.loadAllObjects()
              .then(() => {
                const subType = new Subtype();
                subType.name = 'Carta de intención';
                task.sub_type = subType;
                task.route = task.id + '_carta';
                this.pool = {};
                resolve(success);
              });
          })
          .catch(reject);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.cuencaVerdeService.updateTask(task, users)
          .then(success => {
            this.clearObjects();
            this.loadAllObjects()
              .then(() => {
                this.retrieveInstance(String(task.route), task);
                resolve(success);
              });
          })
          .catch(reject);
      });
    }
  }

  asignarAsociados(objeto: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.asignarAsociados(objeto)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  deleteObject(task: Task) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  deletePredioPotencial(idPredio: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deletePredioPotencial(idPredio)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  filterAporte(objeto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.filterAporte(objeto)
        .then(objetoFilter => resolve(objetoFilter))
        .catch(reject);
    });
  }

  getTaskDetails(taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskDetails(taskId)
        .then(task => resolve(task))
        .catch(reject);
    });
  }

  loadCapaGestionPredial(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.loadCapaGestionPredial()
        .then(geoJson => resolve(geoJson))
        .catch(reject);
    });
  }

  getTaskDetailsOpen(taskId: string): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskDetailsOpen(taskId)
        .then(task => resolve(task))
        .catch(reject);
    });
  }

  getPossibilitySendFinancial(idTask: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPossibilitySendFinancial(idTask)
        .then((response: any) => {
          if (response.verified) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  }

  getTaskHistory(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskHistory()
        .then(task => resolve(task))
        .catch(reject);
    });
  }

  getProcedures(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProcedures()
        .then(procedures => resolve(procedures))
        .catch(reject);
    });
  }

  getGeoJsonByProcedure(procedure: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getGeoJsonByProcedure(procedure)
        .then(geoJson => resolve(geoJson))
        .catch(reject);
    });
  }

  getGeoJsonByExecutionTask(idTask: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getGeoJsonByExecutionTask(idTask)
        .then(geoJson => resolve(geoJson))
        .catch(reject);
    });
  }

  getActionHash(hash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActionHash(hash)
        .then(action => resolve(action as any))
        .catch(reject);
    });
  }

  getMonitoreosCalendar(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMonitoreosCalendar()
        .then(task => resolve(task))
        .catch(reject);
    });
  }

  crearCertificado(taskId: string): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.crearCertificado(taskId)
        .then(() => resolve())
        .catch(reject);
    });
  }

  enviarCertificado(taskId: string): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.enviarCertificado(taskId)
        .then(() => resolve())
        .catch(reject);
    });
  }

  sendTaskFlowExecution(request: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendTaskFlowExecution(request)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  sendOpenTaskFinanciero(objetoSend: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendOpenTaskFinanciero(objetoSend)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  sendOpenTask(objetoSend: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendOpenTask(objetoSend)
        .then((response) => {
          this.clearObjects();
          resolve(response);
        })
        .catch(reject);
    });
  }

  sendOpenSpecialTask(objetoSend: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendOpenSpecialTask(objetoSend)
        .then((response) => {
          this.clearObjects();
          resolve(response);
        })
        .catch(reject);
    });
  }

  createOpenTaskFlowExecution(task: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createOpenTaskFlowExecution(task)
        .then((response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        })
        .catch(reject);
    });
  }

  closeTaskFlowExecution(idTask: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.closeTaskFlowExecution(idTask)
        .then((response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        })
        .catch(reject);
    });
  }

  cancelarTask(taskId: string): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.cancelarTask(taskId)
        .then(() => resolve())
        .catch(reject);
    });
  }

  returnTask(taskId: string): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.returnTask(taskId)
        .then(() => resolve())
        .catch(reject);
    });
  }

  returnTaskFinanciero(taskId: string): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.returnTaskFinanciero(taskId)
        .then(() => resolve())
        .catch(reject);
    });
  }

  getAllComments(task: any): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getCommentbyIdTask(task)
        .then(comments => resolve(comments))
        .catch(reject);
    });
  }

  isBudgetContractor(idProcess: string): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.isBudgetContractor(idProcess)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  hasStardForm(taskId: string): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.hasStardForm(taskId)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  isBudgetFinal(idProcess: string): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.isBudgetFinal(idProcess)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getAllCommentsExecutionTask(idTask: string): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllCommentsExecutionTask(idTask)
        .then(comments => resolve(comments))
        .catch(reject);
    });
  }

  getOpenTaskComments(task: string): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getOpenTaskComments(task)
        .then(comments => resolve(comments))
        .catch(reject);
    });
  }

  getDataReportGerencial(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getDataReportGerencial()
        .then(data => resolve(data))
        .catch(reject);
    });
  }

  getAllMonitoreoComments(monitoreoDetail: MonitoreoDetail): Promise<Array<Comments>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getCommentByMonitoreoId(monitoreoDetail)
        .then(comments => resolve(comments))
        .catch(reject);
    });
  }

  getTypeMonitor(): Promise<Array<MonitoreoTypes>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTypeMonitor()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  insertComment(comment: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertCommentsTask(comment)
        .then(() => resolve())
        .catch(reject);
    });
  }

  insertCommentExecutionTask(comment: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertCommentExecutionTask(comment)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  insertCommentOpenTask(comment: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertCommentOpenTask(comment)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  updatePollPredio(comment: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertCommentsPredio(comment)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  insertCommentPredio(comment: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertCommentsPredio(comment)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  editFormComunication(taskObjeto: any, taskId: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.editFormComunication(taskObjeto, taskId)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        });
    });
  }

  updateLetterOrSurvey(objeto: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateLetterOrSurvey(objeto)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  uploadCoordenadasPredio(objetoPredio: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.uploadCoordenadasPredio(objetoPredio)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  insertMonitoreoComment(comment: object) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertMonitoreoComment(comment)
        .then(() => resolve())
        .catch(reject);
    });
  }

  insertCommentMonitoreoCalendar(comment: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.insertCommentMonitoreoCalendar(comment)
        .then(() => resolve())
        .catch(reject);
    });
  }

  public getObjectForEdit(objectId: string): Promise<BaseObject> {
    return new Promise((resolve, reject) => {
      const task: Task = this.search(objectId);
      if (task && task.user) {
        resolve(task);
      } else {
        this.load(objectId)
          .then(returnedObject => {
            resolve(returnedObject);
          })
          .catch(function (error: any) {
            reject(error);
          });
      }
    });
  }

  getSurveyFromTaskId(taskId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getSurvey(taskId)
        .then(property => resolve(property))
        .catch(reject);
    });
  }

  getSurveyFromPredioId(predioId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getSurveyByPredio(predioId)
        .then(property => {
          if (!property.family_information) {
            property.family_information = <FamilyInformation> {};
          }
          if (!property.basic_needs.hydrological_source) {
            property.basic_needs.hydrological_source = <HydrologicalSource>{};
          }
          if (!property.basic_needs.electricity_source) {
            property.basic_needs.electricity_source = <ElectricitySource>{};
          }
          if (!property.basic_needs.cooking_methods) {
            property.basic_needs.cooking_methods = <CookingMethods>{};
          }
          if (!property.basic_needs.basic_sanitation_methods) {
            property.basic_needs.basic_sanitation_methods = <BasicSanitationMethods>{};
          }
          resolve(property);
        })
        .catch(reject);
    });
  }

  getBudgetFromTaskId(taskId: number): Promise<Array<Budget>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getBudget(taskId)
        .then(budget => {
          if (budget instanceof Array) {
            resolve(budget);
          }
        })
        .catch(reject);
    });
  }

  getBudgetFromProcess(idProcess: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getBudgetFromProcess(idProcess)
        .then(budget => {
          resolve(budget);
        })
        .catch(reject);
    });
  }

  getBudgetFromProcessContractor(idProcess: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getBudgetFromProcessContractor(idProcess)
        .then(budget => {
          resolve(budget);
        })
        .catch(reject);
    });
  }

  getBudgetFromProcessExecution(idProcess: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getBudgetFromProcessExecution(idProcess)
        .then(budget => {
          resolve(budget);
        })
        .catch(reject);
    });
  }

  getAllBudgets() {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllBudgets()
        .then(budgets => {
          if (budgets instanceof Array) {
            resolve(budgets);
          }
        })
        .catch(reject);
    });
  }

  approveTask(taskId: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.approveTask(String(taskId))
        .then((response: any) => {
          if (response.code !== 500) {
            resolve();
          } else {
            reject(response.message);
          }
        });
    });
  }

  sendPredioFlow(idPredio: string, recUserId: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendPredioFlow(String(idPredio), String(recUserId))
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  backPredioFlow(idPredio: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.backPredioFlow(String(idPredio))
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  sendPredioFlowEnd(idPredio: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendPredioFlowEnd(String(idPredio))
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  backPredio(idPredio: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.sendPredioFlowEnd(String(idPredio))
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  selectPredioUser(idPredio: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.selectPredioUser(String(idPredio))
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  getDocumentsPredio(idPredio: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getDocumentsPredio(idPredio)
        .then((response) => resolve(response))
        .catch(reject);
    });
  }

  crearMonitor(monitor: Monitoreo) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.crearMonitor(monitor)
        .then(() => resolve())
        .catch(reject);
    });
  }

  crearMetas(meta: MetasAporte) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.crearMetas(meta)
        .then(() => resolve())
        .catch(reject);
    });
  }

  crearMonitorCalendar(monitor: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.crearMonitorCalendar(monitor)
        .then((response: any) => {
          if (response.response_code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  crearExecutionTask(objeto: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.crearExecutionTask(objeto)
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  createDetailService(objeto: DetailsBudgets) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createDetailService(objeto)
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  reasignDetailService(objeto: DetailsBudgets, idFrom: String) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.reasignDetailService(objeto, idFrom)
        .then((response: any) => {
          if (response.code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  getExecutionTask(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getExecutionTask()
        .then((response) => {
          if (response instanceof Array) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  ///////// Proyectos get list ALL
  getListProjectsAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getListProjectsAll()
        .then((response) => {
          if (response.length > 0) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  ///////// Proyectos get list by IDPROGRAM
  getListProjects(idProgram: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getListProjects(idProgram)
        .then((response) => {
          if (response.length > 0) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  ///////// Acciones de buenas practicas
  getActionsGoodPractices(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActionsGoodPractices()
        .then((response) => {
          if (response.length > 0) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  getListUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getListUsers()
        .then((response) => {
          if (response.length > 0) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  getListPrograms(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getListPrograms()
        .then((response) => {
          if (response.length > 0) {
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  getExecutionTaskById(idExecution: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getExecutionTaskById(idExecution)
        .then((response: any) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getMonitorFromId(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMonitorFromId(id)
        .then(monitor => resolve(monitor))
        .catch(reject);
    });
  }

  getMonitorFromIdCalendar(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMonitorFromIdCalendar(id)
        .then(monitor => resolve(monitor))
        .catch(reject);
    });
  }

  updateMonitorCalendar(monitor: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateMonitorCalendar(monitor)
        .then((response: any) => {
          if (response.response_code === 200) {
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(reject);
    });
  }

  getMonitoreos(task_id: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMonitoreos(task_id)
        .then((response) => resolve(response))
        .catch(reject);
    });
  }

  getTaskOvercome(): Promise<Array<Task>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTaskOvercome()
        .then((response: any) => {
          if (response instanceof Array) {
            resolve(response as Array<Task>);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  getMonitoreoDetail(monitoreoId: string): Promise<MonitoreoDetail> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMonitoreoDetail(monitoreoId)
        .then((response) => resolve(response))
        .catch(reject);
    });
  }

  deleteMonitoreos(id: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deleteMonitoreos(id)
        .then(() => resolve())
        .catch(reject);
    });
  }

  deleteMetas(id: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.deleteMetas(id)
        .then(() => resolve())
        .catch(reject);
    });
  }

  getCartaIntencion(taskId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getCartaIntencion(taskId)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getCartaStard(taskId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getCartaStard(taskId)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getMinuta(taskId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getMinuta(taskId)
        .then((response: any) => {
          if (response.code === 500) {
            reject(response.message);
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getActivities(procedure: Procedure): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActivities(procedure.id)
        .then(activities => {
          resolve(activities);
        })
        .catch(reject);
    });
  }
}
