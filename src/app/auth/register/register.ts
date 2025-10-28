import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPasswordValidator } from '../../shared/password-validator';
import { ApiService } from '../../core/services/api';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  apiService = inject(ApiService);

  fieldsFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.minLength(8), customPasswordValidator()]),
    email: new FormControl('', [Validators.email])
  });

  isPasswordInvalid = signal(false);
  passwordInvalidMessage = signal('');

  isUsernameInvalid = signal(false);
  usernameInvalidMessage = signal('');

  isEmailInvalid = signal(false);
  emailInvalidMessage = signal('');

  submitRegistration(){
    this.resetErrorLabel();

    if(this.fieldsFormGroup?.invalid){

      if(this.fieldsFormGroup.get('password')?.invalid){
        //check if password is empty
        if(this.fieldsFormGroup.get('password')?.value?.length == 0){
          this.passwordInvalidMessage.set('Please enter a valid password');
        }else{
          this.passwordInvalidMessage.set('Must be at least 8 characters with lower and upper case, and a special character')
        }
        this.isPasswordInvalid.set(true);
      }

      if(this.fieldsFormGroup.get('username')?.invalid){
        //check if username is empty
        if(this.fieldsFormGroup.get('username')?.value?.length == 0){
          this.usernameInvalidMessage.set('Please enter a valid username');
        }else{
          this.usernameInvalidMessage.set('Username must be atleast 5 characters long')
        }
        this.isUsernameInvalid.set(true);
      }

      if(this.fieldsFormGroup.get('email')?.invalid){
        //check if username is empty
        if(this.fieldsFormGroup.get('email')?.value?.length == 0){
          this.emailInvalidMessage.set('Please enter a valid email');
        }else{
          this.emailInvalidMessage.set('Please enter a valid email format')
        }
        this.isEmailInvalid.set(true);
      }
    }else{
      this.apiService.registerUser(this.fieldsFormGroup);
    }
  }

  resetErrorLabel(){
    this.isUsernameInvalid.set(false);
    this.usernameInvalidMessage.set('');

    this.isPasswordInvalid.set(false);
    this.passwordInvalidMessage.set('');

    this.isEmailInvalid.set(false);
    this.emailInvalidMessage.set('');
  }


}
