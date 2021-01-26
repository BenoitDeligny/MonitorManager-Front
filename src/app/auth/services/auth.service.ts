import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logUser(formUser: User) {
    const user = formUser;

    return this.http.post<User>(environment.localUrl + 'auth/login', user);

    // TODO find how to import .shareReplay();
  }

  createUser(formUser: User) {
    const createdUser = formUser;
    return this.http.post<User>(environment.localUrl + 'users', createdUser);
  }
}
