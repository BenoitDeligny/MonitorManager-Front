import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  logUser(formUser: User) {
    const user = formUser;
    return this.http.post<User>(environment.localUrl + 'auth/login', user);
  }

  accessProfile() {
    return this.http.get(environment.localUrl + 'users/profile');
  }

  createUser(formUser: User) {
    const createdUser = formUser;
    return this.http.post<User>(environment.localUrl + 'users', createdUser);
  }

  updateUser(user: User) {
    const updatedUser = user;
    return this.http.put(environment.localUrl + 'users', updatedUser);
  }

  recoverPassword(email: string) {
    return this.http.post(environment.localUrl + 'users/forgetPassword', {
      email,
    });
  }

  logout() {
    alert('You are disconnected');
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/auth']);
  }
}
