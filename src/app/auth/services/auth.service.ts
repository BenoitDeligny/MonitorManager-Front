import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logUser(formUser: User) {
    const user = formUser;

    return this.http
      .post<User>(environment.localUrl + 'auth/login', user)
      .subscribe((token) => {
        localStorage.setItem('jwt_token', token['access_token']);
      });
    // TODO find how to import .shareReplay();
  }

  createUser(formUser: User) {
    const createdUser = formUser;
    return this.http
      .post<User>(environment.localUrl + 'users', createdUser)
      .subscribe();
  }
}
