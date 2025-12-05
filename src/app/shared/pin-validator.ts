import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function customPinValidator() : ValidatorFn {
   return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;
    const isNumber = /^[0-9]+$/.test(value);
    let isPinValid : boolean = (isNumber && value.length >= 6) ? true : false;
    return isPinValid ? null : {invalidError: 'PIN must be a number and at least 6 digits'}
   }
}
