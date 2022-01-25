import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { User } from '../model/model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  loading = false;
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private usersSvc: UsersService,
    private commonSvc: CommonService
  ) {
    this.commonSvc.loading.subscribe((loading) => {
      this.loading = loading;
    });

    this.route.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.commonSvc.loading.next(true);
        this.usersSvc.getSingleUser(parameters['id']).subscribe(
          (response) => {
            this.user = response.data;
            this.commonSvc.loading.next(false);
          },
          () => {
            this.commonSvc.loading.next(false);
            this.commonSvc.message.next('Usuario no encontrado');
          }
        );
      }
    });
  }

  ngOnInit(): void {}
}
