import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // * active l'effet blanc au clique du bouton
    this.primengConfig.ripple = true;
  }

  createUser(signupForm: NgForm) {
    if (signupForm.valid) {
      this.authService.createUser(signupForm.value);
    } else {
      alert('It miss some informations ! (Or you are trying to cheat...)');
    }
  }
}
