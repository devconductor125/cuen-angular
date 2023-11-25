import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeedCapital} from '../../data/model/seedCapital';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {Asociado} from '../../data/model/asociado';

@Component({
  selector: 'app-create-edit-seed-capital',
  templateUrl: './create-edit-seed-capital.component.html',
  styleUrls: ['./create-edit-seed-capital.component.scss']
})
export class CreateEditSeedCapitalComponent implements OnInit {

  @Input() public modelSeddCapital: SeedCapital;
  @Input() public bollCreate: boolean;

  @Output() public updateList = new EventEmitter<any>();
  public arrAssociated: Array<Asociado> = [];
  constructor(private services: ProceduresManager) { }

  ngOnInit() {
    this.getAllAssociated();
  }

  private getAllAssociated() {
    this.services.getAllAssociated('associated').then(
      (response: Array<Asociado>) => {
        this.arrAssociated = response;
      }
    );
  }

  public saveSeedCapital() {
    if (this.bollCreate) {
      this.modelSeddCapital.valueCo = this.modelSeddCapital.valueCo.replace(/\./g, '');
      this.modelSeddCapital.valueUsd = this.modelSeddCapital.valueUsd.replace(/\./g, '');
      this.services.createSeedCapital(this.modelSeddCapital).then(
        (response) => {
          this.listAllSeddCapital();
        }
      );
    } else {
      this.modelSeddCapital.valueCo = this.modelSeddCapital.valueCo.replace(/\./g, '');
      this.modelSeddCapital.valueUsd = this.modelSeddCapital.valueUsd.replace(/\./g, '');
      this.services.updateSeedCapital(this.modelSeddCapital).then(
        (response) => {
          this.listAllSeddCapital();
        }
      );
    }
  }

  public listAllSeddCapital() {
    this.updateList.emit();
  }

  public formatSpecific(data: any, id: number) {
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    if (id === 1) {
      $('#value').val(result);
    }
    if (id === 2) {
      $('#valuePeso').val(result);
    }
  }

  public changeNit() {
    let data: any;
    data = this.arrAssociated.filter(associated => associated.id === this.modelSeddCapital.associated.id);
    this.modelSeddCapital.nit = data[0]['nit'];
  }

}
