import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(environment.localUrl + 'users');
  }

  saveUser(user: any) {
    this.http.post(environment.localUrl + 'users', user).subscribe();
  }

  updateUser(user: any) {
    this.http.put(environment.localUrl + 'users', user).subscribe();
  }

  deleteUser(id: number): void {
    this.http.delete(environment.localUrl + `users/${id}`).subscribe();
  }
}
