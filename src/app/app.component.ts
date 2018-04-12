import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetLoggedInfo} from './store/loggedInfo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
}
