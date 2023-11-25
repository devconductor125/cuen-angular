import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BudgetListItem} from '../../../data/model/budget-list-item';
import {User} from '../../../data/model/user';

@Component({
  selector: 'cuenca-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent extends BaseComponent implements OnInit {
  public totals: any;

  public budgets: Array<any>; /// TODO Crear clase Budget
  public subTotal: number;
  public total = 0;
  public task_id = 0;

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    // listado de presupuestos
    this.tasksManager.getAllBudgets()
      .then((budgets: Array<BudgetListItem>) => {
          this.budgets = budgets.reverse();
        }
      );

    this.getTotalForCordinations();
  }

  protected getTotalForCordinations(): void {
    // total por coordinación
      this.tasksManager.getTotalForCordinations()
      .then((response: any) => {
        this.totals = response;
      });
  }

  public gotoDetail(id: string, idTask: string){
    this.router.navigate(['/app/budgets/', id, idTask]);
  }


}
