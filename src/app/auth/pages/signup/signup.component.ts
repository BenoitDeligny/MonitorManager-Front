import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // * active l'effet blanc au clique du bouton
    this.primengConfig.ripple = true;
  }

  createUser(signupForm: NgForm) {
    if (signupForm.valid) {
      this.authService.createUser(signupForm.value).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Account created !',
            life: 4000,
          });
        },
        (err) => {
          if (err.error.statusCode === 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Problem',
              detail: 'Account already exist !',
              life: 4000,
            });
          }
        }
      );
    } else {
      alert('It miss some informations ! (Or you are trying to cheat...)');
    }
  }
}
