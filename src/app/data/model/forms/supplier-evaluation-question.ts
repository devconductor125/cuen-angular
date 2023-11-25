import {BaseObject} from '../base-object';

export class SupplierEvaluationQuestion extends BaseObject {
  public title: String;
  public subTitle1: String;
  public subTitle2: String;
  public criteria1: Array<SupplierEvaluationQuestionCriteria>;
  public criteria2: Array<SupplierEvaluationQuestionCriteria>;
  public score1: number;
  public score2: number;

  constructor(options: any) {
    super();
    this.title = options.title;
    this.subTitle1 = options.subTitle1;
    this.subTitle2 = options.subTitle2;
    this.criteria1 = options.criteria1;
    this.criteria2 = options.criteria2;
    this.score1 = 0;
    this.score2 = 0;
  }

  getScore() {
    const resultObject = {
      validScores: 0,
      score: 0
    };
    const score1 = Number(this.score1);
    const score2 = Number(this.score2);
    if (score1 > 0 && score2 > 0) {
      resultObject.validScores = 2;
      resultObject.score = score1 + score2;
    } else if (score1 > 0) {
      resultObject.validScores = 1;
      resultObject.score = score1;
    } else if (score2 > 0) {
      resultObject.validScores = 1;
      resultObject.score = score2;
    }
    return resultObject;
  }
}

export class SupplierEvaluationQuestionCriteria {
  title: String;
  public checked: boolean;
  weight: number;

  constructor(title: String, weight: number) {
    this.title = title;
    this.weight = weight;
    this.checked = false;
  }
}
