import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-2022';
  loading = false;

  constructor(private commonSvc: CommonService) {
    this.commonSvc.loading.subscribe((loading) => {
      console.log('listen: ', loading);
      this.loading = loading;
    });
  }
}
