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
var Rx_1 = require("rxjs/Rx");
var BusMessage = (function () {
    function BusMessage(channel, data) {
        this.channel = channel;
        this.data = data;
    }
    BusMessage.prototype.getChannel = function () {
        return this.channel;
    };
    BusMessage.prototype.getData = function () {
        return this.data;
    };
    return BusMessage;
}());
exports.BusMessage = BusMessage;
var MessagingService = (function () {
    function MessagingService() {
        this.message = new Rx_1.Subject();
    }
    MessagingService.prototype.publish = function (message) {
        this.message.next(message);
    };
    MessagingService.prototype.getObservable = function () {
        return this.message.asObservable();
    };
    return MessagingService;
}());
MessagingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MessagingService);
exports.MessagingService = MessagingService;
//# sourceMappingURL=messaging.service.js.map