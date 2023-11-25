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
var PoolOfContracts = (function (_super) {
    __extends(PoolOfContracts, _super);
    function PoolOfContracts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PoolOfContracts.prototype.hasBudgets = function () {
        return this.pool_by_process.length > 0;
    };
    return PoolOfContracts;
}(base_object_1.BaseObject));
exports.PoolOfContracts = PoolOfContracts;
//# sourceMappingURL=pool-of-contracts.js.map