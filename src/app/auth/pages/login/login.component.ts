import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // * active l'effet blanc au clique du bouton
    this.primengConfig.ripple = true;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.logUser(loginForm.value).subscribe(
        (res) => {
          localStorage.setItem('jwt_token', res['access_token']);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'You are connected !',
            life: 3000,
          });
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Bad crédentials',
            detail: 'Email or password invalid !',
            life: 3000,
          });
        }
      );
    }
  }
}
