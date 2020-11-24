import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'UserCard',
  templateUrl: './user-card.component.html',
  styleUrls: [ './user-card.component.scss' ]
})
export class UserCardComponent implements OnInit {


  @Input('user') user: User;

  constructor (
    public shareService: ShareService
  ) { }

  ngOnInit (): void { }


}
