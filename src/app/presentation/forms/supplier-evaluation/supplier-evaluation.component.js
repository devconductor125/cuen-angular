"use strict";
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
var router_1 = require("@angular/router");
var supplier_evaluation_1 = require("../../../data/model/forms/supplier-evaluation");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var messaging_service_1 = require("../../../data/services/messaging.service");
var common_1 = require("@angular/common");
var SupplierEvaluationComponent = (function () {
    function SupplierEvaluationComponent(activatedRoute, cuencaVerdeService, messagingService, location, router) {
        this.activatedRoute = activatedRoute;
        this.cuencaVerdeService = cuencaVerdeService;
        this.messagingService = messagingService;
        this.location = location;
        this.router = router;
        this.supplierEvaluation = new supplier_evaluation_1.SupplierEvaluation();
    }
    SupplierEvaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (monitoreoId) {
            _this.monitoreoId = monitoreoId;
            _this.cuencaVerdeService.getSupplierEvaluationForm(monitoreoId)
                .then(function (response) {
                if (response instanceof supplier_evaluation_1.SupplierEvaluation) {
                    _this.supplierEvaluation = response;
                }
            })
                .catch(function (reason) { return console.log(reason); });
        });
    };
    SupplierEvaluationComponent.prototype.ngOnDestroy = function () {
    };
    SupplierEvaluationComponent.prototype.calculateScore = function () {
        this.supplierEvaluation.calculateScore();
    };
    SupplierEvaluationComponent.prototype.sendForm = function () {
        var _this = this;
        if (this.supplierEvaluation.isValid()) {
            this.cuencaVerdeService.sendSupplierEvaluationForm(this.monitoreoId, this.supplierEvaluation)
                .then(function (response) {
                var message = {
                    'tipo': '',
                    'message': 'Envío exitoso',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/view-monitoreos/' + _this.monitoreoId];
                _this.router.navigate(link);
            })
                .catch(function (reason) { return console.log(reason); });
        }
        else {
            var message = {
                'tipo': 'Error',
                'message': 'Debes completar los campos',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    return SupplierEvaluationComponent;
}());
SupplierEvaluationComponent = __decorate([
    core_1.Component({
        selector: 'app-search',
        templateUrl: './supplier-evaluation.component.html',
        styleUrls: ['./supplier-evaluation.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        cuenca_verde_service_1.CuencaVerdeService,
        messaging_service_1.MessagingService,
        common_1.Location,
        router_1.Router])
], SupplierEvaluationComponent);
exports.SupplierEvaluationComponent = SupplierEvaluationComponent;
//# sourceMappingURL=supplier-evaluation.component.js.map