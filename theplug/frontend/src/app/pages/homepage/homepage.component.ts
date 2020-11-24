import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ShareService } from 'src/app/services/share.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ]
})
export class HomepageComponent implements OnInit {

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


  // shuffle users by a specific category
  shuffle_by_category (skill_name: string): void {
    this.users = this.storeService.get_users;

    let temp_users: Array<User> = [];

    for (let i = 0; i < this.users.length; i++) {
      temp_users.push(this.get_user_with_skill(this.users[ i ], skill_name));
    }

    temp_users = temp_users.filter(user => user !== null);
    this.users = this.shareService.shuffle(temp_users);

    this.alert.success(`Sort by ${skill_name}`);
  }



  get_user_with_skill (user: User, skill_name: string): User {
    const skills = user.skills;
    for (let i = 0; i < skills.length; i++) {
      if (skills[ i ].name == skill_name) {
        return user;
      }
    }
    return null;
  }


}
