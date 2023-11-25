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
var base_object_1 = require("../base-object");
var SupplierEvaluationQuestion = (function (_super) {
    __extends(SupplierEvaluationQuestion, _super);
    function SupplierEvaluationQuestion(options) {
        var _this = _super.call(this) || this;
        _this.title = options.title;
        _this.subTitle1 = options.subTitle1;
        _this.subTitle2 = options.subTitle2;
        _this.criteria1 = options.criteria1;
        _this.criteria2 = options.criteria2;
        _this.score1 = 0;
        _this.score2 = 0;
        return _this;
    }
    SupplierEvaluationQuestion.prototype.getScore = function () {
        var resultObject = {
            validScores: 0,
            score: 0
        };
        var score1 = Number(this.score1);
        var score2 = Number(this.score2);
        if (score1 > 0 && score2 > 0) {
            resultObject.validScores = 2;
            resultObject.score = score1 + score2;
        }
        else if (score1 > 0) {
            resultObject.validScores = 1;
            resultObject.score = score1;
        }
        else if (score2 > 0) {
            resultObject.validScores = 1;
            resultObject.score = score2;
        }
        return resultObject;
    };
    return SupplierEvaluationQuestion;
}(base_object_1.BaseObject));
exports.SupplierEvaluationQuestion = SupplierEvaluationQuestion;
var SupplierEvaluationQuestionCriteria = (function () {
    function SupplierEvaluationQuestionCriteria(title, weight) {
        this.title = title;
        this.weight = weight;
        this.checked = false;
    }
    return SupplierEvaluationQuestionCriteria;
}());
exports.SupplierEvaluationQuestionCriteria = SupplierEvaluationQuestionCriteria;
//# sourceMappingURL=supplier-evaluation-question.js.map