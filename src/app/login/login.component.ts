import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';

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
    private commonSvc: CommonService
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
    console.log('LOGIN OK');
    this.commonSvc.loading.next(true);

    setTimeout(() => {
      this.commonSvc.loading.next(false);
    }, 2000);
  }
}
