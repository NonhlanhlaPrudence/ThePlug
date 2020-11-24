import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ShareService } from 'src/app/services/share.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'Editpage',
  templateUrl: './editpage.component.html',
  styleUrls: [ './editpage.component.scss' ]
})
export class EditpageComponent implements OnInit {

  constructor (
    private userService: UserService,
    public alert: AlertService,
    private router: Router,
    public shareService: ShareService,
    public storeService: StoreService
  ) { }

  ngOnInit (): void {
  }

  back = _ => window.history.back();
}
