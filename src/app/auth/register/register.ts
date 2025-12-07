import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { authenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { customPinValidator } from '../../shared/pin-validator';
import { customPinVerify } from '../../shared/pin-verify';
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

  pinSignalTemp = signal<string | null | undefined>(null);

  pinGroup = this.formBuilder.group({ pinField: ['', [Validators.required, customPinValidator()]] })
  pinVerifyGroup = this.formBuilder.group({ pinFieldVerify: ['', [Validators.required, customPinValidator(), customPinVerify(this.pinGroup)]] })
  playerIdGroup = this.formBuilder.group({ playerIdField: ['', [Validators.required]] });

  registerFormGroup = this.formBuilder.group({
    pinGroup: this.pinGroup,
    playerIdGroup: this.playerIdGroup
  });


  nextStepHandler(formGroup: FormGroup){
    if(this.pinGroup.get('pinField')?.value !== formGroup.value['pinFieldVerify']){
      formGroup.markAllAsTouched();
      return;
    }
  }

  submitHandler(){
    let personaName : string = "testingUser";

    this.apiService.getPlayerProfile(this.playerIdGroup.get('playerIdField')?.value).subscribe({
      next: (response: any) =>{
        let personaName : string = response['profile']['personaname'];
        this.registerMethod(personaName);
      },
      error: error =>{
        console.log("error - player id doesn't exist");
      }
    });
  }

  registerMethod(personaName: string){
    this.apiService.registerUser(this.registerFormGroup, personaName).subscribe({
          next: (response: any) =>{
            if(response['doesUserExists']){
              console.log(response['MESSAGE']);
            }else{
              console.log(response);
              this.authService.setToken(response.TOKEN);
              console.log(localStorage.getItem("TOKEN"));
              this.router.navigate(['..']);
            }

          },
          error: error =>{
            console.log("error response at register.ts");
            console.log(error);
          }
    });
  }



}
