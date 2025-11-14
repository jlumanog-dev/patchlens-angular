import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { customPasswordValidator } from '../../shared/password-validator';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { authenticationService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatStepperModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [{
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
  }],
})
export class Register {

  private apiService = inject(ApiService);
  private authService = inject(authenticationService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

/*   usernameGroup = this.formBuilder.group({
    usernameValidator: ['', [Validators.required, Validators.minLength(5)]]
  });
  passwordGroup = this.formBuilder.group({
    passwordValidator: ['', [Validators.minLength(8), customPasswordValidator()]]
  });
  emailGroup = this.formBuilder.group({
    emailValidator: ['', Validators.email]
  }); */

  registerFormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.minLength(8), customPasswordValidator()]],
    email: ['', Validators.email]
  });


  nextStepHandler(formGroup: FormGroup, stepper: MatStepper){
    if(formGroup.invalid){
      formGroup.markAllAsTouched();
      return;
    }
    stepper.next();
  }

  submitHandler(){
/*     let registerFormGroup = this.formBuilder.group({
      username: this.usernameGroup.get('usernameValidator'),
      password: this.passwordGroup.get('passwordValidator'),
      email: this.emailGroup.get('emailValidator')
    }); */
    console.log(this.registerFormGroup.controls);
    this.apiService.registerUser(this.registerFormGroup).subscribe({
      next: (response: any) =>{
        console.log(response);
        this.authService.setToken(response.TOKEN);
        console.log(localStorage.getItem("TOKEN"));
        this.router.navigate(['..']);
      },
      error: error =>{
        console.log("error response at register.ts");
        console.log(error);
      }
    });
  }



}
