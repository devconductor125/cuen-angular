import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions-financial',
  templateUrl: './actions-financial.component.html',
  styleUrls: ['./actions-financial.component.scss']
})
export class ActionsFinancialComponent implements OnInit {

  public selectedProgram: number;
  public selectedProject: number;
  public selectedActivity: number;
  constructor() {
    this.selectedProgram = 0;
    this.selectedProject = 0;
    this.selectedActivity = 0;
  }

  ngOnInit() {
  }

}
