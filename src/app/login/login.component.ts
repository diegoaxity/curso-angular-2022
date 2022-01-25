import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginService } from '../login.service';
import { LoginRequest } from '../model/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private commonSvc: CommonService,
    private loginSvc: LoginService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.commonSvc.loading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.commonSvc.loading.next(true);

    const req = this.formLogin.value as LoginRequest;
    this.loginSvc.login(req).subscribe(
      (response) => {
        console.log(response);
        this.commonSvc.loading.next(false);
        this.router.navigate(['home']);
      },
      (errObj) => {
        console.log(errObj.error.error);
        this.commonSvc.loading.next(false);
        this.commonSvc.message.next(errObj.error.error);
      },
      () => {
        console.log('complete');
      }
    );
  }
}
