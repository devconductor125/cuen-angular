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
Object.defineProperty(exports, "__esModule", { value: true });
var base_object_1 = require("./base-object");
var PQRS = (function (_super) {
    __extends(PQRS, _super);
    function PQRS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PQRS.prototype.isValid = function () {
        return !!(this.id_card && this.name && this.email && this.description &&
            this.dependency && Number(this.dependency.id) > 0 && this.pqrsType &&
            Number(this.pqrsType.id) > 0);
    };
    PQRS.prototype.isValidForResponse = function () {
        return this.isValid() && this.response != null;
    };
    return PQRS;
}(base_object_1.BaseObject));
exports.PQRS = PQRS;
//# sourceMappingURL=pqrs.js.map