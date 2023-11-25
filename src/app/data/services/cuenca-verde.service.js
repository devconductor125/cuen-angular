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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var base_service_1 = require("./base.service");
var Observable_1 = require("rxjs/Observable");
var cuenca_verde_service_object_mapper_1 = require("./cuenca-verde-service-object-mapper");
var CuencaVerdeService = (function (_super) {
    __extends(CuencaVerdeService, _super);
    function CuencaVerdeService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.PROJECTS_END_POINT = 'process';
        _this.TASKS_END_POINT = 'tasks';
        _this.CONSULT_FILES = 'generals/files/task';
        _this.POOL_OF_CONTRACTS_PROCEDURES_END_POINT = 'pool/budget/process';
        _this.POOL_OF_CONTRACTS_END_POINT = 'pool';
        _this.MONITOREOS_END_POINT = 'monitoring';
        _this.CARTA_INTENCION_END_POINT = 'generals/letter/intention';
        _this.OPEN_TASKS_END_POINT = 'generals/task/open';
        _this.PROCEDURE_PERCENTAGE_END_POINT = 'generals/percentage/task/execution';
        _this.ACTIVITIES_END_POINT = 'process/by/activities';
        return _this;
    }
    CuencaVerdeService.prototype.getProcedures = function () {
        var url = this.API_HOST + "/process";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToProceduresArray)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTotalForCordinations = function () {
        var url = this.API_HOST + "/generals/coordinating/budget";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.bugdetByProcess = function (idProcess) {
        var url = this.API_HOST + "/generals/comandProces/" + idProcess;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPrograms = function () {
        var url = this.API_HOST + "/generals/programs";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProfile = function () {
        var url = this.API_HOST + "/profile";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPredios = function () {
        var url = this.API_HOST + "/generals/property/consult/potential";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPrediosProc = function (idProc) {
        var url = this.API_HOST + "/property/consult/potential/exist/" + idProc;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getGeoJson = function (taskId) {
        var url = this.API_HOST + "/maps/task/geojson/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.sendProperty = function (geoJson) {
        var url = this.API_HOST + "/property";
        return this.http
            .post(url, { headers: this.cuencaHeaders }, JSON.stringify(geoJson))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.createProcedure = function (procedure) {
        var request = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapProcedureToRequest(procedure);
        var url = this.API_HOST + "/" + this.PROJECTS_END_POINT;
        return this.http
            .post(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProcedure = function (projectId) {
        var url = this.API_HOST + "/" + this.PROJECTS_END_POINT + "/" + projectId + "/edit";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToProcedure)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.returnTask = function (task_id) {
        var url = this.API_HOST + "/back/task/" + task_id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToProcedure)
            .catch(this.handleError);
    };
    ///////REGRESAR TAREA DE FINANCIERO A DIRECCION CAMBIO DE ESTADO
    CuencaVerdeService.prototype.returnTaskFinanciero = function (task_id) {
        var url = this.API_HOST + "/back/task/" + task_id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToProcedure)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.crearCertificado = function (task_id) {
        var url = this.API_HOST + "/generals/request/ct/" + task_id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.enviarCertificado = function (task_id) {
        var url = this.API_HOST + "/generals/send/certificate/tradition/" + task_id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /////////cancelar Tarea de parte de Direccion
    CuencaVerdeService.prototype.cancelarTask = function (task_id) {
        var url = this.API_HOST + "/generals/cancel/process/task/map/property/" + task_id; ////Modificar a servicio nueva
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateProcedure = function (procedure) {
        var request = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapProcedureToRequest(procedure);
        var url = this.API_HOST + "/" + this.PROJECTS_END_POINT + "/" + procedure.id;
        return this.http
            .put(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.ok; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.deleteProcedure = function (id) {
        var url = this.API_HOST + "/" + this.PROJECTS_END_POINT + "/" + id;
        return this.http
            .delete(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.ok; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAllTasks = function () {
        var _this = this;
        return this.getTasks()
            .flatMap(function (tasks) { return _this.getCartasIntencion(tasks); })
            .flatMap(function (tasks) { return _this.getOpenTasks(tasks); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTasks = function () {
        var url = this.API_HOST + "/" + this.TASKS_END_POINT;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .map(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTasksArray);
    };
    CuencaVerdeService.prototype.getCartasIntencion = function (tasks) {
        var url = this.API_HOST + "/" + this.CARTA_INTENCION_END_POINT;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .map(function (cartasIntencion) {
            var cartasIntencionObjects = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTasksArray(cartasIntencion);
            tasks = tasks.concat(cartasIntencionObjects);
            return tasks;
        });
    };
    CuencaVerdeService.prototype.getOpenTasks = function (tasks) {
        var url = this.API_HOST + "/" + this.OPEN_TASKS_END_POINT;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .map(function (openTasks) {
            var openTasksObjects = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTasksArray(openTasks);
            tasks = tasks.concat(openTasksObjects);
            return tasks;
        });
    };
    CuencaVerdeService.prototype.getProjectTasks = function (projectId) {
        var url = this.API_HOST + "/generals/consultTasksByProject/" + projectId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProjectAllTasks = function (projectId) {
        var url = this.API_HOST + "/tasks/process/with/property/" + projectId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.createTask = function (task) {
        var request = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapTaskToRequest(task);
        var url = this.API_HOST + "/" + this.TASKS_END_POINT;
        return this.http
            .post(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.asignarAsociados = function (objeto) {
        var url = this.API_HOST + "/commandand/action_budget/associated";
        return this.http
            .post(url, objeto, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTask = function (taskId) {
        var url = this.API_HOST + "/" + this.TASKS_END_POINT + "/" + taskId + "/edit";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTask)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProcedureTasksAndPredio = function (idProcess) {
        var url = this.API_HOST + "/tasks/process/with/property/" + idProcess;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getInterventionProcess = function (idProcess) {
        var url = this.API_HOST + "/generals/users/intervention/process/" + idProcess;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getCartaIntencionForEdit = function (cartaIntencionId) {
        var id = cartaIntencionId.substring(0, 2);
        var url = this.API_HOST + "/" + this.CARTA_INTENCION_END_POINT + "/" + id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTask)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getOpenTaskForEdit = function (openTaskId) {
        var id = openTaskId.substring(0, 2);
        var url = this.API_HOST + "/" + this.OPEN_TASKS_END_POINT + "/" + id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTask)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateCartaIntencion = function (task) {
        var request = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapTaskToRequest(task);
        var url = this.API_HOST + "/" + this.CARTA_INTENCION_END_POINT + "/" + task.id;
        return this.http
            .put(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.ok; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateTask = function (task) {
        var request = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapTaskToRequest(task);
        var url = this.API_HOST + "/" + this.TASKS_END_POINT + "/" + task.id;
        return this.http
            .put(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.ok; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.deleteTask = function (taskId) {
        var url = this.API_HOST + "/" + this.TASKS_END_POINT + "/" + taskId;
        return this.http
            .delete(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.ok; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTaskTypes = function (procedureId) {
        var url = this.API_HOST + "/generals/typeTaskByActivity/" + procedureId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTaskTypes)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTaskTypesEdit = function (procedureId) {
        var url = this.API_HOST + "/generals/typeTaskByActivity/process/" + procedureId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTaskTypes)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getRolesAll = function () {
        var url = this.API_HOST + "/generals/consultRoleContractorGuard";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getRoles = function () {
        var url = this.API_HOST + "/generals/consultRoleTeamGuard";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getOpenRoles = function () {
        var url = this.API_HOST + "/generals/all/roles";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getRolesEquipo = function () {
        var url = this.API_HOST + "/generals/consultRoleTeamGuard";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getUsers = function (rolId) {
        var url = this.API_HOST + "/generals/user/" + rolId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.uploadFiles = function (taskId, fileList) {
        var url = this.API_HOST + "/loadFiles";
        var formData = new FormData();
        formData.append('task_id', taskId);
        if (fileList.length > 0) {
            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                formData.append('files[]', file, file.name);
            }
        }
        return this.http
            .post(url, formData, { headers: this.cuencaHeadersUpload })
            .toPromise()
            .then(function (response) { return response.ok; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.makeFileRequest = function (taskId, fileList, progressListener, type_file) {
        var _this = this;
        var url = this.API_HOST + "/generals/loadFiles";
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData();
            formData.append('task_id', String(taskId.id));
            formData.append('subType_id', String(taskId.sub_type.id));
            formData.append('type_file', String(type_file));
            for (var i = 0; i < fileList.length; i++) {
                formData.append('files[]', fileList[i], fileList[i].name);
            }
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            observer.next(JSON.parse(xhr.response));
                        }
                        catch (e) {
                            console.log('makeFileRequest: ' + e);
                        }
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                var progress = Math.round(event.loaded / event.total * 100);
                progressListener(progress);
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', _this.getAuthToken());
            xhr.send(formData);
        }).toPromise();
    };
    CuencaVerdeService.prototype.makeFileRequestContratista = function (user_id, fileList, progressListener, type_file) {
        var _this = this;
        var url = this.API_HOST + "/generals/loadFiles";
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData();
            formData.append('user_id', String(user_id));
            formData.append('type_file', String(type_file));
            for (var i = 0; i < fileList.length; i++) {
                formData.append('files[]', fileList[i], fileList[i].name);
            }
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            observer.next(JSON.parse(xhr.response));
                        }
                        catch (e) {
                            console.log('makeFileRequest: ' + e);
                        }
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                var progress = Math.round(event.loaded / event.total * 100);
                progressListener(progress);
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', _this.getAuthToken());
            xhr.send(formData);
        }).toPromise();
    };
    CuencaVerdeService.prototype.getGuardaCuencaMonthlyQuota = function (userId) {
        var url = this.API_HOST + "/users/quota/" + userId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateGuardaCuencaMonthlyQuota = function (idG, quote) {
        var request = {
            'user_quota': quote,
            'user_id': idG
        };
        var url = this.API_HOST + "/users/quota/" + idG;
        return this.http
            .put(url, request, { headers: this.cuencaHeadersJson })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.sendMap = function (taskId, budget, map) {
        var request = {
            geojson: JSON.stringify(map),
            budget: budget,
            task_id: taskId
        };
        return this.http
            .post(this.API_HOST + "/maps/task/geojson", request, { headers: this.cuencaHeadersJson })
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.sendPotencialPredio = function (predio) {
        return this.http
            .post(this.API_HOST + "/generals/property/potential", predio, { headers: this.cuencaHeadersJson })
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.removeFile = function (id, type) {
        var formData = new FormData();
        formData.append('id_file', String(id));
        formData.append('type_file', String(type));
        var url = this.API_HOST + "/file/delete";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getFiles = function (task) {
        var url = this.API_HOST + "/" + this.CONSULT_FILES + "/" + String(task.id) + "/" + String(task.sub_type ? task.sub_type.id : 0);
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getFilesContractor = function (contractor) {
        var url = this.API_HOST + "/" + this.CONSULT_FILES + "/" + String(contractor.id) + "/" + String(contractor.id);
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getContractModality = function () {
        var url = this.API_HOST + "/generals/modality/contractor";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getMaterials = function () {
        var url = this.API_HOST + "/category_all";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getActionsAll = function () {
        var url = this.API_HOST + "/category_all";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.servOneSignal = function (ID_OneSignal) {
        var formData = new FormData();
        formData.append('player_id', String(ID_OneSignal));
        var url = this.API_HOST + "/generals/getPlayerId";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getContractorsCategorias = function () {
        var url = this.API_HOST + "/category_all";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getContractType = function () {
        var url = this.API_HOST + "/generals/type/contractor";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTaskForExecution = function () {
        var url = this.API_HOST + "/execution/consult/pool/actions/contractor";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getGuarantee = function () {
        var url = this.API_HOST + "/" + this.CONSULT_FILES + "/";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTaskDetails = function (taskId) {
        var url = this.API_HOST + "/" + this.TASKS_END_POINT + "/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTask)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTaskHistory = function () {
        var url = this.API_HOST + "/generals/task/history/intervention/user";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////filtrar aportes
    CuencaVerdeService.prototype.filterAporte = function (objeto) {
        var url = this.API_HOST + "/commandand/filter/" + objeto.directive_filter + "/" + objeto.id_objeto;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToTask)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getGeoJsonByProcedure = function (procedure) {
        var url = this.API_HOST + "/monitoring/process/" + procedure + "/geojson";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getActionHash = function (hash) {
        var url = this.API_HOST + "/monitoring/" + hash + "/geojson/action/material";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getMonitoreosCalendar = function () {
        var url = this.API_HOST + "/monitoring";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getContractorDetails = function (contract_id) {
        var url = this.API_HOST + "/users/" + contract_id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToContractor)
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAllAssociated = function () {
        var url = this.API_HOST + "/commandand/allassociated";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAllAportes = function () {
        var url = this.API_HOST + "/commandand/budgets";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAllMetas = function () {
        var url = this.API_HOST + "/commandand/goalReadAll";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAportesEspecie = function (idAporte) {
        var url = this.API_HOST + "/commandand/goalReadAll";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAporteForId = function (idAporte) {
        var url = this.API_HOST + "/commandand/detailbudget/" + idAporte;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.deleteProject = function (idProject) {
        /*
        const formData: FormData = new FormData();
        formData.append('budget', String(aporte.aporte));
        formData.append('associated_id', String(aporte.asociado_id));
        formData.append('project_activity_id', String(aporte.activity_id));
        formData.append('type', String(aporte.type));
        formData.append('budget_species', String(aporte.budget_species));
        formData.append('species_contribution', String(aporte.species_contribution));
        */
        var url = this.API_HOST + "/commandand/insert";
        return this.http
            .post(url, idProject, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.deleteActivity = function (idActivity) {
        /*
        const formData: FormData = new FormData();
        formData.append('budget', String(aporte.aporte));
        formData.append('associated_id', String(aporte.asociado_id));
        formData.append('project_activity_id', String(aporte.activity_id));
        formData.append('type', String(aporte.type));
        formData.append('budget_species', String(aporte.budget_species));
        formData.append('species_contribution', String(aporte.species_contribution));
        */
        var url = this.API_HOST + "/commandand/insert";
        return this.http
            .post(url, idActivity, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.insertProject = function (project, idProgram) {
        /*
        const formData: FormData = new FormData();
        formData.append('budget', String(aporte.aporte));
        formData.append('associated_id', String(aporte.asociado_id));
        formData.append('project_activity_id', String(aporte.activity_id));
        formData.append('type', String(aporte.type));
        formData.append('budget_species', String(aporte.budget_species));
        formData.append('species_contribution', String(aporte.species_contribution));
        */
        var url = this.API_HOST + "/commandand/insert";
        return this.http
            .post(url, project, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.insertAssociated = function (aporte) {
        debugger;
        var formData = new FormData();
        formData.append('budget', String(aporte.aporte));
        formData.append('associated_id', String(aporte.asociado_id));
        formData.append('project_activity_id', String(aporte.activity_id));
        formData.append('type', String(aporte.type));
        formData.append('budget_species', String(aporte.budget_species));
        formData.append('species_contribution', String(aporte.species_contribution));
        var url = this.API_HOST + "/commandand/insert";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.insertActivityByProject = function (activity, idProject) {
        /*
        const formData: FormData = new FormData();
        formData.append('budget', String(aporte.aporte));
        formData.append('associated_id', String(aporte.asociado_id));
        formData.append('project_activity_id', String(aporte.activity_id));
        formData.append('type', String(aporte.type));
        formData.append('budget_species', String(aporte.budget_species));
        formData.append('species_contribution', String(aporte.species_contribution));
        */
        var url = this.API_HOST + "/commandand/insert";
        return this.http
            .post(url, activity, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateAporte = function (aporte) {
        var formData = new FormData();
        formData.append('budget', String(aporte.budget));
        formData.append('paid_budget', String(aporte.paid_budget));
        formData.append('type', String(aporte.type));
        formData.append('budget_species', String(aporte.budget_species));
        formData.append('species_contribution', String(aporte.species_contribution));
        formData.append('id', String(aporte.id));
        var url = this.API_HOST + "/commandand/update";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.traslateAporte = function (objeto) {
        var formData = new FormData();
        formData.append('id', String(objeto.id));
        formData.append('budget_traslate', String(objeto.budget_traslate));
        formData.append('activity_traslate', String(objeto.activity_traslate));
        var url = this.API_HOST + "/commandand/transaction";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getCommentbyIdTask = function (task) {
        var url = this.API_HOST + "/commentsbyTask/" + task.id + "/" + (task.sub_type ? task.sub_type.id : 0);
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getCommentByMonitoreoId = function (monitoreoDetail) {
        var url = this.API_HOST + "/commentsbyTask/" + monitoreoDetail.id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getTypeMonitor = function () {
        var url = this.API_HOST + "/generals/type/monitoring";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getSurvey = function (taskId) {
        var url = this.API_HOST + "/tasks/property/info/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getMonitorFromId = function (id) {
        var url = this.API_HOST + "/monitoring/" + id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getMonitorFromIdCalendar = function (id) {
        var url = this.API_HOST + "/monitoring/" + id;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getBudget = function (taskId) {
        var url = this.API_HOST + "/tasks/consultBudgetByTask/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAllBudgets = function () {
        var url = this.API_HOST + "/tasks/consult/budget/all";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.approveTask = function (taskId) {
        var formData = new FormData();
        formData.append('task_id', String(taskId));
        var url = this.API_HOST + "/approved";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.aproveTaskCooA = function (taskId, userId) {
        var formData = new FormData();
        formData.append('task_id', String(taskId));
        formData.append('user_id', String(userId));
        var url = this.API_HOST + "/generals/send/task/firm/guardTeam";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////INSERTAR MONITOREO
    CuencaVerdeService.prototype.crearMonitor = function (monitoreo) {
        var formData = new FormData();
        formData.append('date_start', String(monitoreo.date_start));
        formData.append('date_deadline', String(monitoreo.date_deadline));
        formData.append('task_id', String(monitoreo.task_id));
        formData.append('type_monitoring_id', String(monitoreo.type));
        formData.append('comment', String(monitoreo.comment));
        var url = this.API_HOST + "/monitoring"; ////////RUTA INSERT MONITOREOS
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////INSERTAR MONITOREO
    CuencaVerdeService.prototype.crearMetas = function (meta) {
        var formData = new FormData();
        formData.append('unit', String(meta.unit));
        formData.append('description', String(meta.description));
        formData.append('quantity', String(meta.quantity));
        formData.append('contributions_id', String(meta.contributions_id));
        var url = this.API_HOST + "/commandand/goalInsert"; ////////RUTA INSERT MONITOREOS
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.crearMonitorCalendar = function (monitoreo) {
        var formData = new FormData();
        formData.append('title', String(monitoreo.title));
        formData.append('date_start', String(monitoreo.start));
        formData.append('date_deadline', String(monitoreo.end));
        formData.append('type_monitoring_id', String(monitoreo.type));
        formData.append('comment', String(monitoreo.comentario));
        formData.append('user_id', String(monitoreo.usuario));
        formData.append('process_id', String(monitoreo.procedure));
        formData.append('hash', String(monitoreo.hash));
        var url = this.API_HOST + "/monitoring/process"; ////////RUTA INSERT MONITOREOS
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.crearExecutionTask = function (objeto) {
        var url = this.API_HOST + "/execution/task"; ////////RUTA INSERT task execution
        return this.http
            .post(url, objeto, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateMonitorCalendar = function (monitoreo) {
        var request = {};
        request.title = String(monitoreo.title);
        request.date_start = String(monitoreo.start);
        request.date_deadline = String(monitoreo.end);
        request.type_monitoring_id = String(monitoreo.type);
        request.comment = String(monitoreo.comentario);
        request.user_id = String(monitoreo.usuario);
        request.proccess_id = String(monitoreo.procedure);
        request.hash = String(monitoreo.hash);
        var url = this.API_HOST + "/monitoring/" + monitoreo.id; ////////RUTA UPDATE MONITOREOS
        return this.http
            .put(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET MONITOREOs
    CuencaVerdeService.prototype.getMonitoreos = function (task_id) {
        var url = this.API_HOST + "/monitoring/process/task/" + task_id; ////////RUTA GET MONITOREOS
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET List Program ALL
    CuencaVerdeService.prototype.getListProjectsAll = function () {
        var url = this.API_HOST + "/execution";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET List Program
    CuencaVerdeService.prototype.getListProjects = function (idProgram) {
        var url = this.API_HOST + "/execution/" + idProgram;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET List Program
    CuencaVerdeService.prototype.getListUsers = function () {
        var url = this.API_HOST + "/execution";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET List Program
    CuencaVerdeService.prototype.getListPrograms = function () {
        var url = this.API_HOST + "/execution";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET execution task
    CuencaVerdeService.prototype.getExecutionTask = function () {
        var url = this.API_HOST + "/execution";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET execution task
    CuencaVerdeService.prototype.getExecutionTaskById = function (idExecution) {
        var url = this.API_HOST + "/execution/" + idExecution;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ////////////////////////////GET Task Overcome (Proximas a vencer)
    CuencaVerdeService.prototype.getTaskOvercome = function () {
        var url = this.API_HOST + "/tasks/soon/overcome"; ////////
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getMonitoreoDetail = function (monitoreoId) {
        var url = this.API_HOST + "/" + this.MONITOREOS_END_POINT + "/" + monitoreoId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getCartaIntencion = function (taskId) {
        var url = this.API_HOST + "/" + this.CARTA_INTENCION_END_POINT + "/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getCartaStard = function (taskId) {
        var url = this.API_HOST + "/monitoring/form/stard/process/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getMinuta = function (taskId) {
        var url = this.API_HOST + "/monitoring/form/stard/process/" + taskId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /////////DELETE MONITOREO
    CuencaVerdeService.prototype.deleteMonitoreos = function (id) {
        var url = this.API_HOST + "/monitoring/" + id; ////////RUTA DELETE MONITOREO
        return this.http
            .delete(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    /////////DELETE METAS
    CuencaVerdeService.prototype.deleteMetas = function (id) {
        var url = this.API_HOST + "/monitoring/" + id; ////////RUTA DELETE MONITOREO
        return this.http
            .delete(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.insertCommentsTask = function (comment) {
        var formData = new FormData();
        formData.append('task_id', String(comment.task_id));
        formData.append('sub_type', String(comment.sub_type));
        formData.append('comment', String(comment.comment));
        var url = this.API_HOST + "/generals/commentsbyTask";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.insertMonitoreoComment = function (comment) {
        var formData = new FormData();
        formData.append('task_id', String(comment.task_id));
        formData.append('sub_type', String(comment.sub_type));
        formData.append('comment', String(comment.comment));
        var url = this.API_HOST + "/generals/commentsbyMonitoreo";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.insertCommentMonitoreoCalendar = function (comment) {
        var formData = new FormData();
        formData.append('monitoring_id', String(comment.monitoring_id));
        formData.append('comment', String(comment.comment));
        var url = this.API_HOST + "/monitoring/comment";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.approveTaskSeguimiento = function (taskId) {
        var formData = new FormData();
        formData.append('task_id', String(taskId));
        var url = this.API_HOST + "/tasks/budget/approve";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProgramProjects = function (programId) {
        var url = this.API_HOST + "/generals/programs/projects/" + programId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProjectActivities = function (projectId) {
        var url = this.API_HOST + "/generals/programs/projects/activities/" + projectId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getRoleUser = function () {
        var url = this.API_HOST + "/role";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPoolsOfContracts = function () {
        var url = this.API_HOST + "/" + this.POOL_OF_CONTRACTS_END_POINT;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPoolOfContracts = function (objectId) {
        var url = this.API_HOST + "/" + this.POOL_OF_CONTRACTS_END_POINT + "/" + objectId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPoolOfContractsProcedures = function (poolId) {
        var url = this.API_HOST + "/" + this.POOL_OF_CONTRACTS_PROCEDURES_END_POINT;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.createPoolOfContracts = function (poolOfContracts) {
        var request = cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapPoolOfContractsToRequest(poolOfContracts);
        var url = this.API_HOST + "/" + this.POOL_OF_CONTRACTS_END_POINT;
        return this.http
            .post(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updatePoolOfContracts = function (objeto) {
        var url = this.API_HOST + "/" + this.POOL_OF_CONTRACTS_END_POINT + "/actions/contractor";
        return this.http
            .post(url, objeto, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getContractors = function () {
        var url = this.API_HOST + "/users/all/5";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getContractor = function (objectId) {
        var url = this.API_HOST + "/users/" + objectId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.createContratista = function (contractor) {
        var request = contractor;
        var url = this.API_HOST + "/users";
        return this.http
            .post(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updateContractor = function (contractor) {
        var request = contractor;
        var url = this.API_HOST + "/users/" + contractor.user.id;
        return this.http
            .put(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPredioById = function (predioId) {
        var url = this.API_HOST + "/predio/" + predioId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.sendSupplierEvaluationForm = function (monitorId, supplierEvaluation) {
        var formData = new FormData();
        var url = this.API_HOST + "/monitoring/provider/evaluation/form/" + monitorId;
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getSupplierEvaluationForm = function (supplierId) {
        var url = this.API_HOST + "/supplierForm/" + supplierId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.createPqrs = function (pqrs) {
        var formData = new FormData();
        formData.append('card_id', pqrs.id_card);
        formData.append('contact_name', pqrs.name);
        formData.append('email', pqrs.email);
        formData.append('agreement_corporation', pqrs.conservation_agreement_corporation ? '1' : '0');
        formData.append('subcribe_agreement', pqrs.subscribe_agreement ? '1' : '0');
        formData.append('role_id', pqrs.dependency.id);
        formData.append('type_pqrs', pqrs.pqrsType.id);
        formData.append('description', pqrs.description);
        var url = this.API_HOST + "/pqrs";
        return this.http
            .post(url, formData, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.updatePqrs = function (pqrs) {
        var request = {
            'role_id': pqrs.dependency.id,
            'type_pqrs': pqrs.pqrsType.id
        };
        var url = this.API_HOST + "/comunication/pqrs/" + pqrs.id;
        return this.http
            .put(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.sendPqrsResponse = function (pqrs) {
        var request = {
            'response': pqrs.response,
            'pqrs_id': pqrs.id
        };
        var url = this.API_HOST + "/comunication/pqrs/response";
        return this.http
            .post(url, request, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPqrs = function (pqrsId) {
        var url = this.API_HOST + "/comunication/pqrs/" + pqrsId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getDependencies = function () {
        var url = this.API_HOST + "/pqrs/dependencie";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPqrsTypes = function () {
        var url = this.API_HOST + "/type/pqrs";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getAllPqrs = function () {
        var url = this.API_HOST + "/comunication/pqrs";
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getProceduresWithActionsForPool = function () {
        var url = this.API_HOST + "/" + this.POOL_OF_CONTRACTS_PROCEDURES_END_POINT;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getPercentageData = function (procedureId) {
        var url = this.API_HOST + "/" + this.PROCEDURE_PERCENTAGE_END_POINT + "/" + procedureId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CuencaVerdeService.prototype.getActivities = function (procedureId) {
        var url = this.API_HOST + "/" + this.ACTIVITIES_END_POINT + "/" + procedureId;
        return this.http
            .get(url, { headers: this.cuencaHeaders })
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToActivitiesArray)
            .catch(this.handleError);
    };
    return CuencaVerdeService;
}(base_service_1.BaseService));
CuencaVerdeService = __decorate([
    core_1.Injectable()
], CuencaVerdeService);
exports.CuencaVerdeService = CuencaVerdeService;
//# sourceMappingURL=cuenca-verde.service.js.map