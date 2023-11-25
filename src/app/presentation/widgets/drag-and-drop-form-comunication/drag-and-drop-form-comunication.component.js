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
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var base_component_1 = require("../../base-component/base-component");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var task_1 = require("../../../data/model/task");
var DragAndDropFormComunicationComponent = (function (_super) {
    __extends(DragAndDropComponent, _super);
    function DragAndDropComponent(proceduresManager, cuencaVerdeService, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.rolesManager = rolesManager;
        _this.notify = new core_1.EventEmitter();
        _this.filesList = [];
        _this.filesRepetidos = [];
        _this.filesListTemp = [];
        _this.invalidFiles = [];
        _this.progress = '0';
        _this.loadFilesButtom = false;
        _this.coincidencia = false;
        return _this;
    }
    DragAndDropComponent.prototype.onFilesChange = function (dropfilesList) {
        this.filesRepetidos = [];
        dropfilesList.forEach(function (file) {
            this.coincidencia = false;
            this.filesList.forEach(function (arrayFile) {
                ///alert(file.name + ' ' + arrayFile.name);
                /////COMPARACION
                if (file.name === arrayFile.name && file.size === arrayFile.size) {
                    this.coincidencia = true;
                }
            }, this);
            ///console.log('Coincidencia en el listado: ' + file.name + ' -> ' + this.coincidencia);
            if (!this.coincidencia) {
                this.filesListTemp.push(file);
            }
            else {
                this.filesRepetidos.push(file);
            }
        }, this);
        this.filesListTemp.forEach(function (file) {
            this.filesList.push(file);
        }, this);
        this.filesListTemp = [];
    };
    DragAndDropComponent.prototype.onFileInvalids = function (fileList) {
    };
    DragAndDropComponent.prototype.uploadFiles = function () {
        var _this = this;
        if (this.filesList && this.filesList.length > 0) {
            this.loadFilesButtom = true;
            this.cuencaVerdeService.makeFileRequest(this.taskId, this.filesList, this.onProgressUpdated.bind(this), '') // TODO get task id
                .then(function (success) {
                if (success) {
                    _this.progress = '0';
                    _this.notify.emit({ id: _this.getId(), payload: _this.filesList });
                    _this.filesList = [];
                    _this.loadFilesButtom = false;
                }
                else {
                    console.log('Error al cargar archivos');
                }
            });
        }
    };
    DragAndDropComponent.prototype.removeItem = function (index) {
        ////alert('Index ' + index);
        this.filesList.splice(index, 1);
    };
    DragAndDropComponent.prototype.onProgressUpdated = function (value) {
        this.progress = String(value);
    };
    return DragAndDropComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", task_1.Task)
], DragAndDropFormComunicationComponent.prototype, "taskId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DragAndDropFormComunicationComponent.prototype, "notify", void 0);
DragAndDropFormComunicationComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-drag-and-drop',
        templateUrl: './drag-and-drop-form-comunication.component.html',
        styleUrls: ['./drag-and-drop-form-comunication.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager])
], DragAndDropFormComunicationComponent);
exports.DragAndDropComponent = DragAndDropFormComunicationComponent;
//# sourceMappingURL=drag-and-drop-task.component.js.maps.map
