import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from './model/model';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.api2Url}/cars`);
  }

  saveCar(car: Car): Observable<any> {
    return this.http.post(`${environment.api2Url}/cars`, car);
  }

  editCar(id: string, car: Car): Observable<any> {
    return this.http.put(`${environment.api2Url}/cars/${id}`, car);
  }

  getSingleCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${environment.api2Url}/cars/${id}`);
  }
}
