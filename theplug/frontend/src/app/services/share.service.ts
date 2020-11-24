import { Injectable, TemplateRef } from '@angular/core';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShareService {

  modalRef: BsModalRef;

  constructor (
    private userService: UserService,
    public alert: AlertService,
    public modalService: BsModalService,
    private router: Router
  ) { }

  // convert any given string to title case
  to_titleCase (data: string) {
    let sentence = data.toLowerCase().split(' ');
    for (let i = 0; i < sentence.length; i++) {
      sentence[ i ] = sentence[ i ][ 0 ].toUpperCase() + sentence[ i ].slice(1);
    }
    return sentence.join(' ');
  }


  // view profile
  view_profile (template: TemplateRef<any>, user: User) {
    const { _id } = user;

    // add ama IF statemente
    if (this.userService.is_loggedIn) {
      this.router.navigate([ '/profile', _id ]);
      return;
    }

    this.alert.error('You have to be logged in to view different profile');
    setTimeout(() => { this.modalRef = this.modalService.show(template); }, 2900);

  }


  // shuffle array
  shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[ currentIndex ];
      array[ currentIndex ] = array[ randomIndex ];
      array[ randomIndex ] = temporaryValue;
    }

    return array;
  }


}
