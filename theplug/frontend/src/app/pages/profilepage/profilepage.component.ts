import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ShareService } from 'src/app/services/share.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: [ './profilepage.component.scss' ]
})
export class ProfilepageComponent implements OnInit {

  selected_userId: string;
  selected_user: User = null;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    public alert: AlertService,
    private router: Router,
    public shareService: ShareService
  ) { }

  ngOnInit (): void {
    this.selected_userId = this.route.snapshot.paramMap.get('_id');
    console.log(this.selected_userId);
    this.get_user_by_id();
  }


  // get user profile by id
  get_user_by_id (): void {
    this.userService.get_user_by_id(this.selected_userId).subscribe((user_server: any) => {
      this.selected_user = user_server.users[ 0 ];
      console.log(this.selected_user);
    }, (error) => {
      this.alert.error(error.error.message);
      this.router.navigate([ '/dash' ]);
    })
  }


  back = _ => window.history.back();

}
