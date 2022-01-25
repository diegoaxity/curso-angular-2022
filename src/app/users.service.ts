import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleUserResponse, UsersResponse } from './model/model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${environment.apiUrl}/users`);
  }

  getSingleUser(id: number): Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(
      `${environment.apiUrl}/users/${id}?delay=5`
    );
  }
}
