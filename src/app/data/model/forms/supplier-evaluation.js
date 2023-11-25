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
var supplier_evaluation_question_1 = require("./supplier-evaluation-question");
var SupplierEvaluation = (function (_super) {
    __extends(SupplierEvaluation, _super);
    function SupplierEvaluation() {
        var _this = _super.call(this) || this;
        _this.question1 = new supplier_evaluation_question_1.SupplierEvaluationQuestion({
            title: 'Cumplimiento en bienes (Para contrato de servicios marcar No Aplica)',
            subTitle1: 'Entrega de Bienes según fecha',
            subTitle2: 'Entrega Bienes Cantidad',
            criteria1: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - entrega de bienes según fecha', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Cumple siempre o entrega antes de lo pactado', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Incumple eventualmente', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Incumple permanentemente', 33)
            ],
            criteria2: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - entrega bienes cantidad', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Siempre cumple con las cantidades pedidas o comprometidas', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Algunas veces no cumple con las cantidades pedidas o comprometidas', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Generalmente incumple con las cantidades pedidas o comprometidas', 33)
            ]
        });
        _this.question2 = new supplier_evaluation_question_1.SupplierEvaluationQuestion({
            title: 'Cumplimiento en servicio (Para contrato de bienes marcar No Aplica)',
            subTitle1: 'Entrega servicios según fecha',
            subTitle2: 'Entrega servicios cantidad',
            criteria1: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - entrega servicios según fecha', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Cumple siempre o entrega antes de lo pactado', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Incumple eventualmente', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Incumple permanentemente', 33)
            ],
            criteria2: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - entrega servicios cantidad', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Siempre cumple con las cantidades pedidas o comprometidas', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Algunas veces no cumple con las cantidades pedidas o comprometidas', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Generalmente incumple con las cantidades pedidas o comprometidas', 33)
            ]
        });
        _this.question3 = new supplier_evaluation_question_1.SupplierEvaluationQuestion({
            title: 'Calidad',
            subTitle1: 'Conformidad',
            subTitle2: 'Capacidad de respuesta',
            criteria1: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - conformidad', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Siempre cumple con la calidad del producto o servicio prestado', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Algunas veces cumple con la calidad del producto o servicio prestado', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La mayoría de las veces no cumple con la calidad del producto o servicio prestado', 33)
            ],
            criteria2: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - capacidad de respuesta', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Atiende compras urgentes de forma inmediata', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La capacidad para cumplir urgencias no es la suficiente', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No tiene la capacidad para cumplir urgencias', 33)
            ]
        });
        _this.question4 = new supplier_evaluation_question_1.SupplierEvaluationQuestion({
            title: 'Gestion',
            subTitle1: 'Seguridad Social',
            subTitle2: 'Facturacion',
            criteria1: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - seguridad social', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La atencion al pago de seguridad social es oportuna', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La atencion al pago de seguridad social es inoportuna', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No presenta atencion al pago de seguridad social', 33)
            ],
            criteria2: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - facturación', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La  facturacion es oportuna', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La facturacion es ocasional', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No cumple oportunamente con la facturacion', 33)
            ]
        });
        _this.question5 = new supplier_evaluation_question_1.SupplierEvaluationQuestion({
            title: 'Post contractual',
            subTitle1: 'PQR´S',
            subTitle2: 'Servicio post venta',
            criteria1: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - PQR´S', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Atiende oportunamente las reclamaciones presentadas', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('Atiende ocasionalmente las reclamaciones presentadas', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No atiende reclamaciones', 33)
            ],
            criteria2: [
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No aplica - servicio post venta', 0),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La asesoria es oportuna y acertada', 100),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('La asesoria es ocasional', 66),
                new supplier_evaluation_question_1.SupplierEvaluationQuestionCriteria('No presenta servicio de asesorias', 33)
            ]
        });
        return _this;
    }
    SupplierEvaluation.prototype.calculateScore = function () {
        var tempScore = 0;
        var validScores = 0;
        var question1ScoreResult = this.question1.getScore();
        tempScore = tempScore + question1ScoreResult.score;
        validScores = validScores + question1ScoreResult.validScores;
        var question2ScoreResult = this.question2.getScore();
        tempScore = tempScore + question2ScoreResult.score;
        validScores = validScores + question2ScoreResult.validScores;
        var question3ScoreResult = this.question3.getScore();
        tempScore = tempScore + question3ScoreResult.score;
        validScores = validScores + question3ScoreResult.validScores;
        var question4ScoreResult = this.question4.getScore();
        tempScore = tempScore + question4ScoreResult.score;
        validScores = validScores + question4ScoreResult.validScores;
        var question5ScoreResult = this.question5.getScore();
        tempScore = tempScore + question5ScoreResult.score;
        validScores = validScores + question5ScoreResult.validScores;
        this.score = isNaN(tempScore / validScores) ? 0 : tempScore / validScores;
        this.isApproved = this.score >= 70;
        this.category = this.score >= 90 ? 'A' : this.score >= 70 ? 'B' : 'C';
    };
    SupplierEvaluation.prototype.isValid = function () {
        var hasValidFields = !!(this.contractNumber && this.nitProvider && this.providerName && this.evaluationPeriod);
        var hasValidScore = this.score > 0;
        return hasValidFields && hasValidScore;
    };
    return SupplierEvaluation;
}(base_object_1.BaseObject));
exports.SupplierEvaluation = SupplierEvaluation;
//# sourceMappingURL=supplier-evaluation.js.map