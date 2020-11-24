import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'Signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ],
})
export class SignupComponent implements OnInit {
  modalRef: BsModalRef;

  constructor (
    private modalService: BsModalService,
    public alert: AlertService,
    private userService: UserService
  ) { }

  ngOnInit (): void { }

  close_modal () {
    this.modalService.hide();
  }

  openModal (template: TemplateRef<any>) {
    this.close_modal();
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 200);
  }

  sign_up (name, surname, email, password, passwordConfirm) {
    if (!name || !surname || !email || !password || !passwordConfirm) {
      this.alert.error('All field are required!');
      return;
    }

    if (password !== passwordConfirm) {
      this.alert.error('Password did not match');
      return;
    }

    this.userService
      .sign_up({ name, surname, email, password })
      .subscribe((server_data) => {
        if (
          server_data.message == 'Registration failed, user already exists.'
        ) {
          this.alert.error(server_data.message);
          return;
        }

        if (server_data.message == 'Successfully registered, Please sign in.') {
          this.alert.success(server_data.message);
          this.close_modal();
        }
      });
  }
}
