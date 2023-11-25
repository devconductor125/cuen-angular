"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var core_1 = require("@angular/core");
var strings_1 = require("../utils/strings");
var SessionManager = (function () {
    function SessionManager() {
    }
    SessionManager.prototype.setSession = function (token) {
        localStorage.setItem(strings_1.Strings.AUTH_TOKEN, JSON.stringify(token));
    };
    SessionManager.prototype.getSession = function () {
        return JSON.parse(localStorage.getItem(strings_1.Strings.AUTH_TOKEN));
    };
    SessionManager.prototype.deleteSession = function () {
        localStorage.removeItem(strings_1.Strings.AUTH_TOKEN);
    };
    return SessionManager;
}());
SessionManager = __decorate([
    core_1.Injectable()
], SessionManager);
exports.SessionManager = SessionManager;
//# sourceMappingURL=session.manager.js.map