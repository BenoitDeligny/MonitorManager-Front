import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Role } from 'src/app/shared/models/role';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.localUrl + 'users');
  }

  saveUser(user: User) {
    this.http.post(environment.localUrl + 'users', user).subscribe();
  }

  updateUser(user: User) {
    this.http.put(environment.localUrl + 'users', user).subscribe();
  }

  deleteUser(id: number): void {
    this.http.delete(environment.localUrl + `users/${id}`).subscribe();
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.localUrl + 'roles');
  }
}
