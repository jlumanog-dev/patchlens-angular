import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { authenticationService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from "@angular/material/card";
import { MatAnchor } from "@angular/material/button";
import { customPasswordValidator } from '../../shared/password-validator';

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

  isPinInvalid = signal(false);
  pinInvalidMessage = signal('');

  resetErrorLabel(){

    this.pinInvalidMessage.set('');
    this.isPinInvalid.set(false);
  }
  //reactive form
  loginFormGroup = new FormGroup({
/*       username: new FormControl('', [Validators.required]),
 */      pinField: new FormControl('', [Validators.required, customPasswordValidator])
  });


  navigateToRegister(){
    console.log('register');
    this.router.navigate(['register']);
  }

  submitHandler(){
    this.resetErrorLabel();
   if(this.loginFormGroup.invalid){
    if(this.loginFormGroup.get('pinField')){
      this.pinInvalidMessage.set('Please enter a valid PIN');
      this.isPinInvalid.set(false);
    }
   }
    else{

        this.apiService.authenticate(this.loginFormGroup.value).subscribe({
          next: (response : any) =>{
            console.log(response);
            this.authService.setToken(response.TOKEN);
            console.log(localStorage.getItem("TOKEN"));
            this.router.navigate(['..']);
          },
          error: error => {
            console.log(error.error.message);
            this.pinInvalidMessage.set(error.error.message);
            this.isPinInvalid.set(true);
          }
        });
    }
  }
}

