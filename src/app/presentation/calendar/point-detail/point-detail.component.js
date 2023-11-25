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
var infoPoint_1 = require("../../../data/model/infoPoint");
var PointDetailComponent = (function (_super) {
    __extends(PointDetailComponent, _super);
    ///// @Output() notify: EventEmitter<object> = new EventEmitter<object>();
    function PointDetailComponent(proceduresManager, cuencaService, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.cuencaService = cuencaService;
        _this.rolesManager = rolesManager;
        return _this;
    }
    PointDetailComponent.prototype.ngOnInit = function () {
        this.URL_IMG = this.cuencaService.API_IMAGES_URL_CUENCA;
        this.comments = this.point.comments;
        console.log(this.point);
    };
    PointDetailComponent.prototype.popUpImage = function (imagen) {
        // modal
        var modal = document.getElementById('myModal');
        // obtener imagen y setear
        var modalImg = document.getElementById('img01');
        var captionText = document.getElementById('caption');
        modal.style.display = 'block';
        modalImg.src = this.URL_IMG + imagen.name;
        ////captionText.innerHTML = 'Caption Example';
    };
    PointDetailComponent.prototype.closeModal = function () {
        // modal
        var modal = document.getElementById('myModal');
        modal.style.display = 'none';
    };
    return PointDetailComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", infoPoint_1.InfoPoint)
], PointDetailComponent.prototype, "point", void 0);
PointDetailComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-point-detail-monitoring',
        templateUrl: './point-detail.component.html',
        styleUrls: ['./point-detail.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager])
], PointDetailComponent);
exports.PointDetailComponent = PointDetailComponent;
//# sourceMappingURL=point-detail.component.js.map