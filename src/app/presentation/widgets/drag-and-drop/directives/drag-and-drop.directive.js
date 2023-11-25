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
var DragAndDropDirective = (function () {
    function DragAndDropDirective() {
        this.allowedExtensions = [];
        this.filesChangedEmitter = new core_1.EventEmitter();
        this.filesInvalidEmitter = new core_1.EventEmitter();
        this.background = '#eee';
    }
    DragAndDropDirective.prototype.onDragOver = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    };
    DragAndDropDirective.prototype.onDragLeave = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    };
    DragAndDropDirective.prototype.onDrop = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
        var files = evt.dataTransfer.files;
        var validFiles = [];
        var invalidFiles = [];
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files.item(i);
                var ext = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
                if (this.allowedExtensions.lastIndexOf(ext) !== -1) {
                    validFiles.push(file);
                }
                else {
                    invalidFiles.push(file);
                }
            }
            this.filesChangedEmitter.emit(validFiles);
            this.filesInvalidEmitter.emit(invalidFiles);
        }
    };
    return DragAndDropDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DragAndDropDirective.prototype, "allowedExtensions", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DragAndDropDirective.prototype, "filesChangedEmitter", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DragAndDropDirective.prototype, "filesInvalidEmitter", void 0);
__decorate([
    core_1.HostBinding('style.background'),
    __metadata("design:type", Object)
], DragAndDropDirective.prototype, "background", void 0);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DragAndDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DragAndDropDirective.prototype, "onDragLeave", null);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DragAndDropDirective.prototype, "onDrop", null);
DragAndDropDirective = __decorate([
    core_1.Directive({
        selector: '[appDnd]'
    }),
    __metadata("design:paramtypes", [])
], DragAndDropDirective);
exports.DragAndDropDirective = DragAndDropDirective;
//# sourceMappingURL=drag-and-drop.directive.js.map