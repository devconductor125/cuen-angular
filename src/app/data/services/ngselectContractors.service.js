"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var OptionService = OptionService_1 = (function () {
    function OptionService() {
    }
    OptionService.prototype.getCharacters = function () {
        return this.cloneOptions(OptionService_1.PLAYER_ONE);
    };
    OptionService.prototype.loadCharacters = function () {
        return this.loadOptions(OptionService_1.PLAYER_ONE);
    };
    OptionService.prototype.loadOptions = function (options) {
        var _this = this;
        return new Observable_1.Observable(function (obs) {
            setTimeout(function () {
                obs.next(_this.cloneOptions(options));
                obs.complete();
            }, 5000);
        });
    };
    OptionService.prototype.cloneOptions = function (options) {
        return options.map(function (option) { return ({
            value: option.value,
            label: option.label
        }); });
    };
    return OptionService;
}());
OptionService.PLAYER_ONE = [
    { value: '0', label: 'Aech' },
    { value: '1', label: 'Art3mis' },
    { value: '2', label: 'Daito' },
    { value: '3', label: 'Parzival' },
    { value: '4', label: 'Shoto' }
];
OptionService = OptionService_1 = __decorate([
    core_1.Injectable()
], OptionService);
exports.OptionService = OptionService;
var OptionService_1;
//# sourceMappingURL=ngselectContractors.service.js.map