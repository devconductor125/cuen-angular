import {Component, Input} from '@angular/core';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {RolesManager} from '../../data/managers/roles.manager';
import {ResponseContentType} from '@angular/http';
import {BrowserUtils} from '../../data/utils/browser.utils';
import {Procedure} from '../../data/model/procedure';
import {environment} from '../../../environments/environment';
import Comments = commentsInterface.Comments;
import {User} from '../../data/model/user';
import { AlertsListComponent } from '../widgets/alerts-list/alerts-list.component';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.html'
})
export class BaseComponent {
  public SUPER_ADMINISTRATIVO = 1;
  public ADMINISTRATIVO = 2;
  public COORDINADOR = 3; /// COORDINACIÓN GENERAL
  public GUARDACUENCA = 4;
  public SIG = 6;
  public EQUIPO_SEGUIMIENTO = 7;
  public JURIDICO = 8;
  public COORDINADOR_RESTAURACION = 9;
  public COORDINADOR_RECURSO_HIDRICO = 10;
  public GERENCIA = 10; ////concretar
  public FINANCIERO = 11;
  public DIRECCION = 12;
  public COMUNICACIONES = 13;
  public TENCNICO = 14;
  public APOYO_COORDINADOR_RESTAURACION = 15;
  public APOYO_COORDINADOR_RECURSO_HIDRICO = 16;
  public APOYO_COMUNICACIONES = 17;

  public URL_BASE_FILES: string;
  public URL_BASE_IMAGES: string;
  public IMAGES_URL_CUENCA: string;

  @Input() componentId: string;
  @Input() subTypeTask_id: any;
  protected placeholder: any;
  public userRoles: Array<number> = [];
  public allusers: Array<User> = [];
  public isSuperAdmin: boolean;
  public isGuardaCuenca: boolean;
  public isAdministrativo: boolean;
  public isCoordinador: boolean;
  public isCoordinadorRecursoHidrico: boolean;
  public isApoyoCoordinadorRecursoHidrico: boolean;
  public isCoordinadorRestauracion: boolean;
  public isApoyoCoordinadorRestauracion: boolean;
  public isCoordinadorGuardacuenca: boolean;
  public isSig: boolean;
  public isJuridico: boolean;
  public isSeguimiento: boolean;
  public isGerencia: boolean;
  public isDireccion: boolean;
  public isFinanciero: boolean;
  public isComunicaciones: boolean;
  public canShowSpecialCheckbox: boolean;
  public isDisabledSpecialCheckbox: boolean;
  public isOpenTaskChecked: boolean;
  public isApoyoComunicaciones: boolean;
  public isTencnico  : boolean;
  public comments: Array<Comments>;

  protected SUBTYPE_TAREA_HIDRICO_ENVIAR_A_SIG = '22';
  protected SUBTYPE_TAREA_HIDRICO_EDITAR_MAPA = '23';
  protected SUBTYPE_TAREA_HIDRICO_POR_FINALIZAR = '24';
  protected SUBTYPE_TAREA_HIDRICO_FINALIZADA = '25';

  protected SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_GUARDACUENCA = '26';
  protected SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_SIG = '27';
  protected SUBTYPE_TAREA_EROSIVOS_EDITAR_MAPA = '28';
  protected SUBTYPE_TAREA_EROSIVOS_POR_FINALIZAR = '29';
  protected SUBTYPE_TAREA_EROSIVOS_FINALIZADA = '30';

  protected SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_ENCUENTRO = '6';
  protected SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_PLAN = '7';
  protected SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_EXPERIENCIA = '8';
  protected SUBTYPE_TAREA_COMUNICACION_FINALIZADA = '5';

  protected SUBTYPE_TAREA_PSA_REASIGNAR_A_GUARDACUENCA = '2';
  protected SUBTYPE_TAREA_PSA_REASIGNAR_A_SIG = '39';
  protected SUBTYPE_TAREA_PSA_EDITAR_SIG = '40';
  protected SUBTYPE_TAREA_PSA_POR_FINALIZAR = '41';
  protected SUBTYPE_TAREA_PSA_FINALIZADA = '42';

  protected SUBTYPE_TAREA_CONTRATISTA_FINALIZADA = '20';

  protected SUBTYPE_SPECIAL_FIRST_ONE = 31;
  protected SUBTYPE_SPECIAL_LAST_ONE = 38;

  public pickedImageUrl: any;

  public users: Array<User> = [];
  public usersSelected: Array<any> = [];
  public usuariosTareaList: Array<any> = [];

  constructor(protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager) {
    this.placeholder = {} as any;
    this.placeholder.id = 0;
    this.placeholder.name = 'Selecciona una opción';
  }

  getUserRoles(component: any): void {
    component.rolesManager.searchUserRoles()
      .then((roles: Array<any>) => {
        component.userRoles = roles;
        component.isCoordinador = component.isRole(component.COORDINADOR_RECURSO_HIDRICO) ||
          component.isRole(component.APOYO_COORDINADOR_RECURSO_HIDRICO) ||
          component.isRole(component.COORDINADOR_RESTAURACION) ||
          component.isRole(component.APOYO_COORDINADOR_RESTAURACION) ||
          component.isRole(component.COMUNICACIONES);
        component.isCoordinadorRecursoHidrico = component.isRole(component.COORDINADOR_RECURSO_HIDRICO);
        component.isApoyoCoordinadorRecursoHidrico = component.isRole(component.APOYO_COORDINADOR_RECURSO_HIDRICO);
        component.isCoordinadorRestauracion = component.isRole(component.COORDINADOR_RESTAURACION);
        component.isApoyoCoordinadorRestauracion = component.isRole(component.APOYO_COORDINADOR_RESTAURACION);
        component.isCoordinadorGuardacuenca = component.isRole(component.COORDINADOR);
        component.isSig = component.isRole(component.SIG);
        component.isSeguimiento = component.isRole(component.EQUIPO_SEGUIMIENTO);
        component.isGerencia = component.isRole(component.GERENCIA);
        component.isSuperAdmin = component.isRole(component.SUPER_ADMINISTRATIVO);
        component.isAdministrativo = component.isRole(component.ADMINISTRATIVO);
        component.isGuardaCuenca = component.isRole(component.GUARDACUENCA);
        component.isJuridico = component.isRole(component.JURIDICO);
        component.isDireccion = component.isRole(component.DIRECCION);
        component.isTencnico = component.isRole(component.TENCNICO);
        component.isFinanciero = component.isRole(component.FINANCIERO);
        component.isComunicaciones = component.isRole(component.COMUNICACIONES);
        component.isApoyoComunicaciones = component.isRole(component.APOYO_COMUNICACIONES);
        component.onGotRoles(component.userRoles);
      });
  }

  protected onGotRoles(): void {
  }

  getId(): string {
    return this.componentId;
  }

  protected shouldDelete(callback: any) {
    let shouldDelete;
    shouldDelete = confirm('Deseas borrar el elemento?');
    if (shouldDelete) {
      callback();
    }
  }

  protected getCustomPlaceholder(customMessage: string) {
    const placeholder = {} as any;
    placeholder.id = 0;
    placeholder.name = customMessage;
    return placeholder;
  }

  private isRole(role: number): boolean {
    return this.userRoles.indexOf(role) >= 0;
  }

  public getDateWithHour(date: string): String {
    if (date) {
      const fecha = date.split(' ');
      const datos = fecha[0].split('-');
      const dia = datos[2];
      const mes = datos[1];
      const yy = datos[0];
      let fechaFinal: String = '';
      let stringMes: String = '';
      /////MES
      switch (mes) {
        case '01':
          stringMes = 'Enero';
          break;
        case '02':
          stringMes = 'Febrero';
          break;
        case '03':
          stringMes = 'Marzo';
          break;
        case '04':
          stringMes = 'Abril';
          break;
        case '05':
          stringMes = 'Mayo';
          break;
        case '06':
          stringMes = 'Junio';
          break;
        case '07':
          stringMes = 'Julio';
          break;
        case '08':
          stringMes = 'Agosto';
          break;
        case '09':
          stringMes = 'Septiembre';
          break;
        case '10':
          stringMes = 'Octubre';
          break;
        case '11':
          stringMes = 'Noviembre';
          break;
        case '12':
          stringMes = 'Diciembre';
          break;
      }
      if (fecha[1]) {
        fechaFinal = dia + ' de ' + stringMes + ' del año ' + yy + ' Hora: ' + fecha[1];
      } else {
        fechaFinal = dia + ' de ' + stringMes + ' del año ' + yy;
      }
      return fechaFinal;
    } else {
      return null;
    }
  }

  public getDateWithoutHour(date: string): String {
    const fecha = date.split(' ');
    const datos = fecha[0].split('-');
    const dia = datos[2];
    const mes = datos[1];
    const yy = datos[0];
    const fechaFinal = dia + '-' + mes + '-' + yy;
    return fechaFinal;
  }

  protected mergeBudgets(budget1: any, budget2: any) {
    const keysBudget2: Array<string> = Object.keys(budget2);
    keysBudget2.forEach(function (key: string) {
      if (budget1[key]) {
        budget1[key] = budget1[key] + budget2[key];
      } else {
        budget1[key] = budget2[key];
      }
    });
    return budget1;
  }

  public downloadFile(http: any, baseUrl: string, fileName: string) {
    const url: String = baseUrl.concat(fileName);
    const newFileName = fileName.substring(fileName.indexOf('_') + 1);
    const newExtension = fileName.substring(fileName.length - 4, fileName.length);
    return http.get(url, {
      responseType: ResponseContentType.Blob
    }).map((res: any) => {
      return {
        filename: newFileName,
        data: res.blob()
      };
    }).subscribe((blob: any) => {
      BrowserUtils.downloadAnyFromBlob(blob.data, newFileName, newExtension);
    }, (error: any) => {
      console.log('download error:', JSON.stringify(error));
    }, () => {
      console.log('Completed file download.');
    });
  }

  public downloadFileWithToken(cuencaService: any, baseUrl: string, document: any): void {
    let fileName = document.name;
    if (!fileName) {
      fileName = document;
    }
    if (document.isImage) {
      baseUrl = environment.API_URL + '/generals/get/allFiles/images';
    }
    cuencaService.getFile(baseUrl + '/' + fileName).then(
      (response: any) => {
        if (response.file) {
          const newFileName = fileName.substring(fileName.indexOf('_') + 1, fileName.lastIndexOf('.'));
          const extension = fileName.substr(fileName.lastIndexOf('.') + 1);
          BrowserUtils.downloadAnyFromBase64(response.file, newFileName, extension, response.type);
        }
      }
    );
  }

  checkProcedureSelected(procedure: Procedure) {
    let hasSelection = false;
    procedure.budget.forEach(function (budget) {
      if (budget.selected) {
        hasSelection = true;
      }
    });
    procedure.task_opens.forEach(function (task) {
      if (task.selected) {
        hasSelection = true;
      }
    });
    procedure.selected = hasSelection;
  }

  getAllUsers(component: any): Promise<any> {
    return new Promise((resolve) => {
      component.proceduresManager.getAllUsers()
        .then((users: Array<User>) => {
          component.allusers = users;
          resolve(users);
        });
    });
  }

  getUsersGuardaCuencas(component: any): Promise<any> {
    return new Promise((resolve) => {
      component.proceduresManager.getUsers(4)
        .then((users: Array<User>) => {
          resolve(users);
        });
    });
  }

  getUsersEquipoSeguimiento(users: Array<User>, component: any): Promise<any> {
    return new Promise((resolve) => {
      component.proceduresManager.getUsers(7)
        .then((usersSeguimiento: Array<User>) => {
          if (usersSeguimiento.length > 0) {
            users = users.concat(usersSeguimiento);
          }
          resolve(users);
        });
    });
  }

  getUsersCoordinacionGuardaCuenca(users: Array<User>, component: any): Promise<any> {
    return new Promise((resolve) => {
      component.proceduresManager.getUsers(3)
        .then((usersDoordinacionGuardaCuenca: Array<User>) => {
          if (usersDoordinacionGuardaCuenca.length > 0) {
            users = users.concat(usersDoordinacionGuardaCuenca);
          }
          resolve(users);
        });
    });
  }

  editUserArray(dato: Boolean, pos: string, value: string): void {
    this.usersSelected[pos] = dato;
    if (dato) {
      this.usuariosTareaList[pos] = value;
    } else {
      const coin = this.usuariosTareaList.indexOf(value);
      this.usuariosTareaList[pos] = null;
    }
  }
}
