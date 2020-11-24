import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'Signin',
  templateUrl: './signin.component.html',
  styleUrls: [ './signin.component.scss' ],
})
export class SigninComponent implements OnInit {
  modalRef: BsModalRef;

  constructor (
    private modalService: BsModalService,
    public alert: AlertService,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router
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

  sign_in (email, password) {
    if (!email || !password) {
      this.alert.error('All field are required!');
      return;
    }

    this.userService.sign_in(email, password).subscribe((user_server: any) => {
      //console.log(user_server);
      if (user_server.message == "Logged In Successfully!") {
        this.alert.success(user_server.message);
        //console.log(user_server.users[ 0 ]._id);

        let user: User = {
          _id: '',
          email: '',
          skills: [],
          surname: '',
          name: ''
        };
        user._id = user_server.users[ 0 ]._id && user_server.users[ 0 ]._id;
        user.email = user_server.users[ 0 ].email && user_server.users[ 0 ].email;
        user.name = user_server.users[ 0 ].name && user_server.users[ 0 ].name;
        user.skills = user_server.users[ 0 ].skills && user_server.users[ 0 ].skills;
        user.surname = user_server.users[ 0 ].surname && user_server.users[ 0 ].surname;

        // set user in the storeservice
        this.storeService.set_user(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.close_modal();
        this.router.navigate([ '/dash' ]);
        return;
      }
    })
  }
}
