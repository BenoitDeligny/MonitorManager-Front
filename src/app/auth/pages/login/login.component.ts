import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // * active l'effet blanc au clique du bouton
    this.primengConfig.ripple = true;
  }

  onSubmit(loginForm: NgForm) {
    this.authService.logUser(loginForm.value);
  }
}
