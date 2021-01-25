import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logUser(formUser: any) {
    const user = formUser;

    return this.http
      .post<any>(environment.localUrl + 'auth/login', user)
      .subscribe((token) => {
        localStorage.setItem('jwt_token', token['access_token']);
      });
    // TODO find how to import .shareReplay();
  }

  createUser(formUser: any) {
    const createdUser = formUser;
    return this.http
      .post<any>(environment.localUrl + 'users', createdUser)
      .subscribe();
  }
}
