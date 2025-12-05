import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
export function customPinVerify(pinGroup: FormGroup) : ValidatorFn {
   return (control: AbstractControl) : ValidationErrors | null => {
    let isPinMatched : boolean = (control.value == pinGroup.controls['pinField'].value.toString()) ? true : false;
    console.log(isPinMatched);
    console.log(control.value);
    console.log(pinGroup.controls['pinField'].value);
    return isPinMatched ? null : {invalidError: "PIN doesn't match! Try again"}
   }
}
