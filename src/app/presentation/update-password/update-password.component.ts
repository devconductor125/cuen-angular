import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../data/services/auth.service';
import { BusMessage, MessagingService } from '../../data/services/messaging.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  passwordToken: string = '';

  constructor(
    private authService: AuthService, 
    public messagingService: MessagingService, 
    public activatedRoute: ActivatedRoute
    ) {
    activatedRoute.queryParams.subscribe((params) => {
      this.passwordToken = params['token'];
    })
  }

  ngOnInit() {
  }

  updateClick() {
    if (!this.email || this.email.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'please input email',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    } else if (!this.password || this.password.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'please input password',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    } else if (!this.password_confirmation || this.password_confirmation.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'please input password confirmaiton',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    } else if (this.password !== this.password_confirmation) {
      const message = {
        'tipo': 'Error',
        'message': 'confirm password are different',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
    else {
      this.authService.updatePassword({
        email: this.email,
        password: this.password,
        passwordToken: this.passwordToken
      }).subscribe(
        result => {
          this.email = '';
          this.password = '';
          this.password_confirmation = '';
          const message = {
            'tipo': 'Success',
            'message': 'password changed successfully!',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
    } else {
        errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMsg);
}

}
function throwError(errorMsg: string) {
  throw new Error('Function not implemented.');
}

