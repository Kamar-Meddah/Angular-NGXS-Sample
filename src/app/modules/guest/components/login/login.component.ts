import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;


  constructor() {
  }

  ngOnInit() {
  }

  public login(form: FormControl): void {
    if (form.valid) {
      console.log('submitted', this.username);
    }
  }

}
