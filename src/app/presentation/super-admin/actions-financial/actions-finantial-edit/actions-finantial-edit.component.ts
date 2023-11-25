import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accls' +
    'tions-finantial-edit',
  templateUrl: './actions-finantial-edit.component.html',
  styleUrls: ['./actions-finantial-edit.component.scss']
})
export class ActionsFinantialEditComponent implements OnInit {

  public boolEditData: boolean;
  constructor(private router: Router) {
    this.boolEditData = false;
  }

  ngOnInit() {
  }

  public editData() {
    this.boolEditData = !this.boolEditData;
  }

  public gotoActions() {
    this.router.navigate(['app/actions-financial']);
  }

}
