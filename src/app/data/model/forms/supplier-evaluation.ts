import {BaseObject} from '../base-object';
import {SupplierEvaluationQuestion, SupplierEvaluationQuestionCriteria} from './supplier-evaluation-question';

export class SupplierEvaluation extends BaseObject {
  public contractNumber: String;
  public nitProvider: String;
  public providerName: String;
  public evaluationPeriod: String;
  public question1: SupplierEvaluationQuestion;
  public question2: SupplierEvaluationQuestion;
  public question3: SupplierEvaluationQuestion;
  public question4: SupplierEvaluationQuestion;
  public question5: SupplierEvaluationQuestion;
  public comments: String;
  public score: number;
  public isApproved: boolean;
  public category: String;

  constructor() {
    super();
    this.question1 = new SupplierEvaluationQuestion({
      title: 'Cumplimiento en bienes (Para contrato de servicios marcar No Aplica)',
      subTitle1: 'Entrega de Bienes según fecha',
      subTitle2: 'Entrega Bienes Cantidad',
      criteria1: [
        new SupplierEvaluationQuestionCriteria('No aplica - entrega de bienes según fecha', 0),
        new SupplierEvaluationQuestionCriteria('Cumple siempre o entrega antes de lo pactado', 100),
        new SupplierEvaluationQuestionCriteria('Incumple eventualmente', 66),
        new SupplierEvaluationQuestionCriteria('Incumple permanentemente', 33)
      ],
      criteria2: [
        new SupplierEvaluationQuestionCriteria('No aplica - entrega bienes cantidad', 0),
        new SupplierEvaluationQuestionCriteria('Siempre cumple con las cantidades pedidas o comprometidas', 100),
        new SupplierEvaluationQuestionCriteria('Algunas veces no cumple con las cantidades pedidas o comprometidas', 66),
        new SupplierEvaluationQuestionCriteria('Generalmente incumple con las cantidades pedidas o comprometidas', 33)
      ]
    });
    this.question2 = new SupplierEvaluationQuestion({
      title: 'Cumplimiento en servicio (Para contrato de bienes marcar No Aplica)',
      subTitle1: 'Entrega servicios según fecha',
      subTitle2: 'Entrega servicios cantidad',
      criteria1: [
        new SupplierEvaluationQuestionCriteria('No aplica - entrega servicios según fecha', 0),
        new SupplierEvaluationQuestionCriteria('Cumple siempre o entrega antes de lo pactado', 100),
        new SupplierEvaluationQuestionCriteria('Incumple eventualmente', 66),
        new SupplierEvaluationQuestionCriteria('Incumple permanentemente', 33)
      ],
      criteria2: [
        new SupplierEvaluationQuestionCriteria('No aplica - entrega servicios cantidad', 0),
        new SupplierEvaluationQuestionCriteria('Siempre cumple con las cantidades pedidas o comprometidas', 100),
        new SupplierEvaluationQuestionCriteria('Algunas veces no cumple con las cantidades pedidas o comprometidas', 66),
        new SupplierEvaluationQuestionCriteria('Generalmente incumple con las cantidades pedidas o comprometidas', 33)
      ]
    });
    this.question3 = new SupplierEvaluationQuestion({
      title: 'Calidad',
      subTitle1: 'Conformidad',
      subTitle2: 'Capacidad de respuesta',
      criteria1: [
        new SupplierEvaluationQuestionCriteria('No aplica - conformidad', 0),
        new SupplierEvaluationQuestionCriteria('Siempre cumple con la calidad del producto o servicio prestado', 100),
        new SupplierEvaluationQuestionCriteria('Algunas veces cumple con la calidad del producto o servicio prestado', 66),
        new SupplierEvaluationQuestionCriteria('La mayoría de las veces no cumple con la calidad del producto o servicio prestado', 33)
      ],
      criteria2: [
        new SupplierEvaluationQuestionCriteria('No aplica - capacidad de respuesta', 0),
        new SupplierEvaluationQuestionCriteria('Atiende compras urgentes de forma inmediata', 100),
        new SupplierEvaluationQuestionCriteria('La capacidad para cumplir urgencias no es la suficiente', 66),
        new SupplierEvaluationQuestionCriteria('No tiene la capacidad para cumplir urgencias', 33)
      ]
    });
    this.question4 = new SupplierEvaluationQuestion({
      title: 'Gestion',
      subTitle1: 'Seguridad Social',
      subTitle2: 'Facturacion',
      criteria1: [
        new SupplierEvaluationQuestionCriteria('No aplica - seguridad social', 0),
        new SupplierEvaluationQuestionCriteria('La atencion al pago de seguridad social es oportuna', 100),
        new SupplierEvaluationQuestionCriteria('La atencion al pago de seguridad social es inoportuna', 66),
        new SupplierEvaluationQuestionCriteria('No presenta atencion al pago de seguridad social', 33)
      ],
      criteria2: [
        new SupplierEvaluationQuestionCriteria('No aplica - facturación', 0),
        new SupplierEvaluationQuestionCriteria('La  facturacion es oportuna', 100),
        new SupplierEvaluationQuestionCriteria('La facturacion es ocasional', 66),
        new SupplierEvaluationQuestionCriteria('No cumple oportunamente con la facturacion', 33)
      ]
    });
    this.question5 = new SupplierEvaluationQuestion({
      title: 'Post contractual',
      subTitle1: 'PQR´S',
      subTitle2: 'Servicio post venta',
      criteria1: [
        new SupplierEvaluationQuestionCriteria('No aplica - PQR´S', 0),
        new SupplierEvaluationQuestionCriteria('Atiende oportunamente las reclamaciones presentadas', 100),
        new SupplierEvaluationQuestionCriteria('Atiende ocasionalmente las reclamaciones presentadas', 66),
        new SupplierEvaluationQuestionCriteria('No atiende reclamaciones', 33)
      ],
      criteria2: [
        new SupplierEvaluationQuestionCriteria('No aplica - servicio post venta', 0),
        new SupplierEvaluationQuestionCriteria('La asesoria es oportuna y acertada', 100),
        new SupplierEvaluationQuestionCriteria('La asesoria es ocasional', 66),
        new SupplierEvaluationQuestionCriteria('No presenta servicio de asesorias', 33)
      ]
    });
  }

  calculateScore() {
    let tempScore = 0;
    let validScores = 0;

    const question1ScoreResult = this.question1.getScore();
    tempScore = tempScore + question1ScoreResult.score;
    validScores = validScores + question1ScoreResult.validScores;

    const question2ScoreResult = this.question2.getScore();
    tempScore = tempScore + question2ScoreResult.score;
    validScores = validScores + question2ScoreResult.validScores;

    const question3ScoreResult = this.question3.getScore();
    tempScore = tempScore + question3ScoreResult.score;
    validScores = validScores + question3ScoreResult.validScores;

    const question4ScoreResult = this.question4.getScore();
    tempScore = tempScore + question4ScoreResult.score;
    validScores = validScores + question4ScoreResult.validScores;

    const question5ScoreResult = this.question5.getScore();
    tempScore = tempScore + question5ScoreResult.score;
    validScores = validScores + question5ScoreResult.validScores;

    this.score = isNaN(tempScore / validScores) ? 0 : tempScore / validScores;

    this.isApproved = this.score >= 70;
    this.category = this.score >= 90 ? 'A' : this.score >= 70 ? 'B' : 'C';
  }

  isValid() {
    const hasValidFields: boolean = !!(this.contractNumber && this.nitProvider && this.providerName && this.evaluationPeriod);
    const hasValidScore = this.score > 0;
   return hasValidFields && hasValidScore;
  }
}
