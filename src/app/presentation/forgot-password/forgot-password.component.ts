import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth.service';
import { BusMessage, MessagingService } from '../../data/services/messaging.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';
  err: any = null;
  msg: any = null;

  constructor(private authService: AuthService, public messagingService: MessagingService) {
    
  }

  ngOnInit() {
  }

  resetClick() {
    if (!this.email || this.email.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'please input email',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    else {
      this.authService.reqPasswordReset({email: this.email}).subscribe(
        (res) => {
          this.msg = res.json();
        },(error) => {
          this.err = error.error.message;
        });
    }
    
  }
  

}
