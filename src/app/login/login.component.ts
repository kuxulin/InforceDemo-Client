import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  nameFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) {}

  isEveryFieldFull(): Boolean {
    return !this.nameFormControl.errors && !this.passwordFormControl.errors;
  }

  onSubmitClick() {
    this.authService
      .logIn(this.nameFormControl.value!, this.passwordFormControl.value!)
      .subscribe({
        next: () => {
          this.router.navigate(['/urls']);
        },
        error: (result: HttpErrorResponse) => {
          alert(result.error);
        },
      });
  }
}
