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
var geo_json_service_1 = require("../../data/services/geo-json.service");
var base_component_1 = require("../base-component/base-component");
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var roles_manager_1 = require("../../data/managers/roles.manager");
var ShapeFilesUploaderComponent = (function (_super) {
    __extends(ShapeFilesUploaderComponent, _super);
    function ShapeFilesUploaderComponent(proceduresManager, geoJsonService, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.geoJsonService = geoJsonService;
        _this.rolesManager = rolesManager;
        _this.notify = new core_1.EventEmitter();
        _this.shapeFileUploader = 'shapeFileUploader';
        return _this;
    }
    ShapeFilesUploaderComponent.prototype.ngOnInit = function () {
    };
    ShapeFilesUploaderComponent.prototype.ngOnDestroy = function () {
    };
    ShapeFilesUploaderComponent.prototype.onChange = function (event, fileInput) {
        this.fileList = event.target.files;
        this.fileInput = fileInput;
    };
    ShapeFilesUploaderComponent.prototype.reset = function () {
        this.fileInput.value = null;
    };
    ShapeFilesUploaderComponent.prototype.setFileList = function (fileList) {
        this.fileList = fileList;
    };
    ShapeFilesUploaderComponent.prototype.uploadFiles = function () {
        var _this = this;
        this.notify.emit({ id: this.shapeFileUploader, payload: {}, type: 'uploading' });
        if (this.fileList.length > 0) {
            Array.from(this.fileList).forEach(function (file) {
                _this.geoJsonService.shapeToGeoJson(file)
                    .then(function (response) {
                    _this.notify.emit({ id: _this.shapeFileUploader, payload: response, type: 'filesUploaded' });
                });
            });
        }
    };
    return ShapeFilesUploaderComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ShapeFilesUploaderComponent.prototype, "notify", void 0);
ShapeFilesUploaderComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-shape-uploader',
        templateUrl: './shape-files-uploader-properties.component.html',
        styleUrls: ['./shape-files-uploader-properties.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        geo_json_service_1.GeoJsonService,
        roles_manager_1.RolesManager])
], ShapeFilesUploaderComponent);
exports.ShapeFilesUploaderComponent = ShapeFilesUploaderComponent;
//# sourceMappingURL=shape-files-uploader-properties.component.jsoperties.component.js.map
