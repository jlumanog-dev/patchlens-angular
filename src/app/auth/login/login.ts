import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginFormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
  });

  submitHandler(){
    console.log(this.loginFormGroup.value);
  }

}
