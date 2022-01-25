import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { User } from '../model/model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns = [
    'id',
    'email',
    'firstName',
    'lastName',
    'avatar',
    'actions',
  ];
  dataUsers = new MatTableDataSource<User>();

  constructor(
    private usersSvc: UsersService,
    private commonSvc: CommonService,
    private router: Router
  ) {
    this.commonSvc.loading.next(true);
    this.usersSvc.getUsers().subscribe((response) => {
      this.commonSvc.loading.next(false);
      this.dataUsers.data = response.data;
    });
  }

  ngOnInit(): void {}

  goToUser(id: number): void {
    this.router.navigate(['users', id]);
  }
}
