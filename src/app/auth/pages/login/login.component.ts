import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  displayModal = false;
  recoverEmail = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // * active l'effet au clique du bouton
    this.primengConfig.ripple = true;

    this.router.navigate(['home']);
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
          setTimeout(() => this.router.navigate(['/home']), 1500);
          this.authService.accessProfile().subscribe();
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Bad crédentials',
            detail: 'Email and/or password invalid !',
            life: 3000,
          });
        }
      );
    }
  }

  showModal() {
    this.displayModal = true;
  }

  sendRecoveryPassword(email: string) {
    this.displayModal = false;
    this.authService.recoverPassword(email).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Check your email to get your new password !',
          life: 3000,
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Bad email',
          detail: 'The email do not exist !',
          life: 3000,
        });
      }
    );
  }
}
