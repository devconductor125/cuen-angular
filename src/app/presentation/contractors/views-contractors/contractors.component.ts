import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {Router} from '@angular/router';
import {NgAisInstantSearch} from 'angular-instantsearch';
import {NgAisSearchBox} from 'angular-instantsearch/search-box/search-box';
import {User} from '../../../data/model/user';
import {IOption} from 'ng-select';
import {Contractor} from '../../../data/model/contractor';

@Component({
  selector: 'cuenca-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent extends BaseComponent implements OnInit {
  public searchTerm: String;
  public hasResults: Boolean;
  public contractors: Array<any> = null;
  @ViewChild('searchBox') searchBox: NgAisSearchBox;
  @ViewChild('instantSearch') instantSearch: NgAisInstantSearch;

  public contratistas: Array<any> = [];

  constructor(protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              private contractorsManager: ContractorsManager,
              protected router: Router) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.getContratistas();
  }

  getLink(hit: any): String {
    let result = '';
    switch (hit.type) {
      case 'Contratista':
        result = '/app/view-contractor/' + hit.entity_id;
        break;
      default:
        result = '';
    }
    return result;
  }

  openResult(hit: any): void {
    const link = [this.getLink(hit)];
    if (link[0].length > 0) {
      this.router.navigate(link); // TODO Wendy Mayerly to fix router navigation bug
      // window.location.href = 'http://localhost:6200' + link;
    }
  }

  getContratistas(): void {
    const componente = this;
    this.proceduresManager.getUsers(5)
      .then((users: Array<any>) => {
            componente.contratistas = users.reverse();
      });
  }
}
