import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {PoolOfContracts} from '../../../data/model/pool-of-contracts';
import {PoolOfContractsManager} from '../../../data/managers/pool-of-contracts.manager';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';

@Component({
  selector: 'cuenca-pools-of-contracts',
  templateUrl: './pools-of-contracts.component.html',
  styleUrls: ['./pools-of-contracts.component.css']
})
export class PoolsOfContractsComponent extends BaseComponent implements OnInit {
  public pools: Array<PoolOfContracts>;
  public boolFilterExcel: boolean;
  public srtDateFrom: string;
  public srtDateTo: string;
  public selectedFilter: number;
  private brouserUtilities:  BrowserUtils = new BrowserUtils();
  constructor(protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              public rolesManager: RolesManager,
              private poolOfContractsManager: PoolOfContractsManager) {
    super(proceduresManager, rolesManager);
    this.boolFilterExcel = false;
    this.selectedFilter = 0;
  }

  ngOnInit(): void {
    this.poolOfContractsManager.loadAllObjects()
      .then((pools: Array<PoolOfContracts>) => {
          if (pools instanceof Array) {
            this.pools = pools;
          }
        }
      );
    this.getUserRoles(this);
  }

  public viewFieldsDate() {
    this.boolFilterExcel = !this.boolFilterExcel;
  }

  public downloadExcel() {
    if (this.srtDateFrom !== undefined && this.srtDateTo !== undefined) {
      this.poolOfContractsManager.downloadExcelContracts(this.srtDateFrom, this.srtDateTo).then(
        (response) => {
          BrowserUtils.downloadAnyFromBlob(response, 'Procesos contractuales', 'xls');
        }
      );
    } else {
      const message = {
        'tipo': 'Error ',
        'message': 'Se debe especificar las fechas limites.',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }

  }
}
