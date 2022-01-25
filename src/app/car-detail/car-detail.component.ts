import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../cars.service';
import { CommonService } from '../common.service';
import { Car } from '../model/model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  formCar = new FormGroup({});
  id?: string;

  constructor(
    private formBuilder: FormBuilder,
    private carSvc: CarsService,
    private commonSvc: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formCar = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });

    this.route.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.id = parameters['id'];

        this.commonSvc.loading.next(true);
        this.carSvc.getSingleCar(this.id!).subscribe((response) => {
          this.formCar.patchValue(response);
          this.commonSvc.loading.next(false);
        });
      }
    });
  }

  ngOnInit(): void {}

  save(): void {
    this.commonSvc.loading.next(true);
    const car = this.formCar.value as Car;

    if (this.id) {
      // Edición
      this.carSvc.editCar(this.id, car).subscribe(() => {
        this.onSuccess();
      });
    } else {
      // Alta
      this.carSvc.saveCar(car).subscribe(() => {
        this.onSuccess();
      });
    }
  }

  onSuccess(): void {
    this.commonSvc.loading.next(false);
    this.router.navigate(['cars']);
  }
}
