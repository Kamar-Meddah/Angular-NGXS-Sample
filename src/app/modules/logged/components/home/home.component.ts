import {Component, OnInit} from '@angular/core';
import {LoggedInfoState} from '../../../../store/loggedInfo.state';
import {Observable} from 'rxjs/Observable';
import {Select} from '@ngxs/store';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(LoggedInfoState.getUser) user$: Observable<User>;

  constructor() {
  }

  ngOnInit() {
  }

}
