import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CarsService } from '../cars.service';
import { Car } from '../model/model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  displayedColumns = ['brand', 'model', 'year', 'actions'];
  carsData = new MatTableDataSource<Car>();

  constructor(private carsSvc: CarsService, private router: Router) {
    this.carsSvc.getCars().subscribe((response) => {
      this.carsData.data = response;
    });
  }

  ngOnInit(): void {}

  edit(id: string): void {
    this.router.navigate(['car-detail', id]);
  }

  delete(id: string): void {}
}
