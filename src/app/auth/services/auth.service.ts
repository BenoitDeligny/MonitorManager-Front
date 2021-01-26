import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logUser(formUser: User) {
    const user = formUser;
    return this.http.post<User>(environment.localUrl + 'auth/login', user);
  }

  accessProfile() {
    return this.http.get(environment.localUrl + 'profile');
  }

  createUser(formUser: User) {
    const createdUser = formUser;
    return this.http.post<User>(environment.localUrl + 'users', createdUser);
  }
}
