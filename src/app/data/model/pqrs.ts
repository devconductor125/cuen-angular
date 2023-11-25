import {BaseObject} from './base-object';
import {Dependency} from './Dependency';
import {PQRSType} from './PQRSType';

export class PQRS extends BaseObject {
  public id_card: string;
  public name: string;
  public email: string;
  public pqrs_state: string;
  public conservation_agreement_corporation: boolean;
  public subscribe_agreement: boolean;
  public dependency: Dependency;
  public pqrsType: PQRSType;
  public description: string;
  public response: string;
  public state: string;
  public created_at: string;

  isValid(): boolean {
    return !!(this.id_card && this.name && this.email && this.description &&
      this.dependency && Number(this.dependency.id) > 0 && this.pqrsType &&
      Number(this.pqrsType.id) > 0);
  }

  isValidForResponse(): boolean {
    return this.isValid() && this.response != null;
  }
}
