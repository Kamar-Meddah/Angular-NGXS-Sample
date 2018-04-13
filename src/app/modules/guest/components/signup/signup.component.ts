import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private username: string;
  private password: string;
  private confirmedPassword: string;
  private email: string;

  constructor() {
  }

  ngOnInit() {
  }

  public signup(form: FormControl): void {
    if (form.valid && this.confirmedPassword === this.password) {
      console.log('submitted');
    }
  }

  log(a) {
    console.log(a)
  }

}
