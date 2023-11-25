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
var drag_and_drop_component_1 = require("../drag-and-drop/drag-and-drop.component");
var DragAndDropOfacComponent = (function (_super) {
    __extends(DragAndDropOfacComponent, _super);
    function DragAndDropOfacComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragAndDropOfacComponent.prototype.uploadFiles = function () {
        var _this = this;
        if (this.filesList && this.filesList.length > 0) {
            this.loadFilesButtom = true;
            this.cuencaVerdeService.makeFileRequest(this.taskId, this.filesList, this.onProgressUpdated.bind(this), 'OFAC') // TODO get task id
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
    return DragAndDropOfacComponent;
}(drag_and_drop_component_1.DragAndDropComponent));
DragAndDropOfacComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-drag-and-drop-ofac',
        templateUrl: './drag-and-drop-ofac.component.html',
        styleUrls: ['./drag-and-drop-ofac.component.css']
    })
], DragAndDropOfacComponent);
exports.DragAndDropOfacComponent = DragAndDropOfacComponent;
//# sourceMappingURL=drag-and-drop-ofac.component.js.map