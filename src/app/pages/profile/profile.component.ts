import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Password } from 'primeng/password';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  currentUser: User = {
    firstname: '',
    lastname: '',
    email: '',
    alias: '',
    role: {
      id: 0,
      name: '',
    },
    password: '',
  };

  passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
  );

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.accessProfile().subscribe((data) => {
      this.currentUser = data;
    });
  }

  updateProfile(user: User) {
    if (
      (this.currentUser.password &&
        this.currentUser.password.match(this.passwordRegex)) ||
      !this.currentUser.password
    ) {
      this.authService.updateUser(user).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Account updated !',
          life: 3000,
        });
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Problem',
        detail: 'Password not valid !',
        life: 3000,
      });
    }
  }
}
