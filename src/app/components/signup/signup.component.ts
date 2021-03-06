import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = {
    inputData: new FormGroup ({
      username: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
      email: new FormControl('', [ Validators.required, Validators.email ])
    })
  }

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  get username() {
    return this.form.inputData.get('username')
  }

  get email() {
    return this.form.inputData.get('email')
  }

  get password() {
    return this.form.inputData.get('password')
  }

  ngOnInit(): void {
  }

  register() {
    this.authService
    .signUp(this.form.inputData.value)
    .subscribe(
      res => {
        if(res) {
          this.form.inputData.reset()
          this.router.navigate([ 'paymentApp', 'signin' ])
        }
      }
    )
  }

}
