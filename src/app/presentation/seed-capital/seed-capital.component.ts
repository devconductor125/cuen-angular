import { Component, OnInit } from '@angular/core';
import {SeedCapital} from '../../data/model/seedCapital';
import {ProceduresManager} from '../../data/managers/procedures.manager';
@Component({
  selector: 'app-seed-capital',
  templateUrl: './seed-capital.component.html',
  styleUrls: ['./seed-capital.component.scss']
})
export class SeedCapitalComponent implements OnInit {

  public objSeedCapital: SeedCapital;
  public boolCreateSeedCapital: boolean;
  public arrSeedCapital: Array<SeedCapital> = [];

  constructor(private services: ProceduresManager) {
    this.boolCreateSeedCapital = false;
    this.objSeedCapital = new SeedCapital();
  }

  ngOnInit() {
    this.getAllSeedCapital();
  }
  public setVarCreate() {
    this.objSeedCapital = new SeedCapital();
    this.boolCreateSeedCapital = true;
  }

  public setVarEdit(seedCapital: SeedCapital) {
    this.boolCreateSeedCapital = false;
    this.objSeedCapital = seedCapital;
  }

  public getAllSeedCapital() {
    this.services.getAllSeedCapital().then(
      (response: Array<any>) => {
        this.arrSeedCapital = response;
        this.resetAlnumericValue();
      }
    );
  }

  private resetAlnumericValue() {
    for (let i in this.arrSeedCapital['data']) {
      this.arrSeedCapital['data'][i].valueUsd = this.arrSeedCapital['data'][i].valueUsd.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      this.arrSeedCapital['data'][i].valueUsdOrigin = this.arrSeedCapital['data'][i].valueUsdOrigin.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      this.arrSeedCapital['data'][i].valueCo = this.arrSeedCapital['data'][i].valueCo.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      this.arrSeedCapital['data'][i].valueCoOrigin = this.arrSeedCapital['data'][i].valueCoOrigin.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    }
  }

}
