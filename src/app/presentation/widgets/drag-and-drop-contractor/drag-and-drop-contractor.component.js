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
var drag_and_drop_component_1 = require("../drag-and-drop/drag-and-drop.component");
var DragAndDropContractorComponent = (function (_super) {
    __extends(DragAndDropContractorComponent, _super);
    function DragAndDropContractorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragAndDropContractorComponent.prototype.uploadFilesContractor = function (contract_id) {
        var _this = this;
        if (this.filesList && this.filesList.length > 0) {
            this.loadFilesButtom = true;
            this.cuencaVerdeService.makeFileRequestContratista(contract_id, this.filesList, this.onProgressUpdated.bind(this), 'contractor')
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
    return DragAndDropContractorComponent;
}(drag_and_drop_component_1.DragAndDropComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DragAndDropContractorComponent.prototype, "userId", void 0);
DragAndDropContractorComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-drag-and-drop-contractor',
        templateUrl: './drag-and-drop-contractor.component.html',
        styleUrls: ['./drag-and-drop-contractor.component.css']
    })
], DragAndDropContractorComponent);
exports.DragAndDropContractorComponent = DragAndDropContractorComponent;
//# sourceMappingURL=drag-and-drop-contractor.component.js.map