import {BaseObject} from './base-object';
import {PoolOfContractsAction} from './pool-of-contracts-action';
import {PoolOfContractsOpenTask} from './pool-of-contracts-open-task';

export class PoolOfContracts extends BaseObject {
  name: string;
  contract_id = '0';
  pool_by_process: Array<PoolOfContractsAction>;
  task_open: Array<PoolOfContractsOpenTask>;
  other_camps: OtherCamps;
  contractor: any;

  public constructor() {
    super();
    this.other_camps = new OtherCamps();
  }

  hasBudgets() {
    return this.pool_by_process.length > 0 || this.task_open.length > 0;
  }
}

export class OtherCamps {
  numContact: number;
  object?: any;
  tipeContarct: number;
  totalIva: number;
  formPay: number;
  valueMonth: string;
  placeExecution?: any;
  termInit: number;
  dateSuscription: number;
  dateInit: number;
  dateEnd: number;
  renovation: Renovation;
  termEnd?: any;
  nombreSupervisorSolicitante: string;
  guararntee: Array<{value: string, name: string}> = [];
  supervisor: string;
  arrOtherDates: Array<{date: string}>;

  public constructor() {
    this.renovation = new Renovation();
  }
}

export class Renovation {
  other: string;
  requireRenovation: boolean;
}

