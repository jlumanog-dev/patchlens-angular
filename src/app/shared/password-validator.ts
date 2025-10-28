import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


//made a custom validator function for password used in login.ts
export function customPasswordValidator() : ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const password = control.value;


    //Check if password has at least one or more uppercase, lowercase, numerical value, and a sepcial character
    const hasUppercase = /[A-Z]+/.test(password); // At least one uppercase letter (A-Z)
    const hasLowercase = /[a-z]+/.test(password); // At least one lowercase letter (a-z)
    const hasNumber = /[0-9]+/.test(password); // At least one number (0-9)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    let isPasswordValid: boolean = (hasLowercase && hasUppercase && hasNumber && hasSpecialChar) ? true : false;

    return isPasswordValid ? null : {invalidPassword: true}

  }
}
