import {Asociado} from './asociado';

export class SeedCapital {
  id?: string;
  associated: Asociado;
  valueUsd: string;
  valueCo: string;
  nit: string;
  codeCenter: string;
  created_at: string;
  updated_at: string;
  valueUsdOrigin: string;
  valueCoOrigin: string;
  data: Array<any> = [];

  constructor() {
    this.associated = new Asociado();
  }
}
