import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { authenticationService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from "@angular/material/card";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCard, MatAnchor],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  apiService = inject(authenticationService);
  authService = inject(authenticationService);
  zone = inject(NgZone);
  route = inject(ActivatedRoute);

  router = inject(Router);

  isUsernameInvalid = signal(false);
  usernameInvalidMessage = signal('');

  isPasswordInvalid = signal(false);
  passwordInvalidMessage = signal('');

  resetErrorLabel(){
    this.usernameInvalidMessage.set('');
    this.isUsernameInvalid.set(false);

    this.passwordInvalidMessage.set('');
    this.isPasswordInvalid.set(false);
  }
  //reactive form
  loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
  });


  navigateToRegister(){
    console.log('register');
    this.router.navigate(['register']);
  }

  submitHandler(){
    this.resetErrorLabel();
    if(this.loginFormGroup.invalid){
      if(this.loginFormGroup.get('username')?.invalid){
        if(this.loginFormGroup.get('password')?.invalid){
          this.isUsernameInvalid.set(true);
          this.usernameInvalidMessage.set("Please enter a valid username")
          this.isPasswordInvalid.set(true);
          this.passwordInvalidMessage.set("Please enter a valid password");
        }else{
          this.isUsernameInvalid.set(true);
          this.usernameInvalidMessage.set("Please enter a valid username")
        }
      }
      else if(this.loginFormGroup.get('password')?.invalid){
        this.isPasswordInvalid.set(true);
        this.passwordInvalidMessage.set("Please enter a valid password");
      }else{
        this.isUsernameInvalid.set(true);
        this.isPasswordInvalid.set(true);
        this.usernameInvalidMessage.set("Please enter a valid username");
        this.passwordInvalidMessage.set("Please enter a valid password");
      }
    }
    else{

        this.apiService.authenticate(this.loginFormGroup.value).subscribe({
          next: response =>{
            console.log(response);
            this.authService.setToken(response.TOKEN);
            console.log(localStorage.getItem("TOKEN"));
            this.router.navigate(['..']);
          },
          error: error => {
            console.log(error.error.message);
            this.usernameInvalidMessage.set(error.error.message);
            this.isUsernameInvalid.set(true);
          }
        });
    }
  }
}

