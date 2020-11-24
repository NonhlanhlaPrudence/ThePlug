import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ShareService } from 'src/app/services/share.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: [ './dashboardpage.component.scss' ]
})
export class DashboardpageComponent implements OnInit {

  users: Array<User> = [];

  constructor (
    public alert: AlertService,
    public storeService: StoreService,
    private userService: UserService,
    private shareService: ShareService
  ) { }

  ngOnInit (): void {
    // get all users
    this.get_users();

  }


  // get all users
  get_users (): void {
    this.userService.get_users().subscribe((server_users: Array<User>) => {
      this.storeService.set_users(server_users);
      this.users = server_users;
    });
  }


}
