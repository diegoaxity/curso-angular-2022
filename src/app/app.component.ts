import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-2022';
  loading = false;

  constructor(private commonSvc: CommonService, private snackBar: MatSnackBar) {
    this.commonSvc.loading.subscribe((loading) => {
      console.log('listen: ', loading);
      this.loading = loading;
    });

    this.commonSvc.message.subscribe((msg) => {
      this.snackBar.open(msg, 'OK', {
        duration: 3000,
      });
    });
  }
}
