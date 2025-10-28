import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";


@Injectable({providedIn: 'root'})
export class ApiService{

  private http = inject(HttpClient);


  //attempt to register a new user
  registerUser(formData: FormGroup){

    //circular structure means object contains a reference to itself
    //http.post doesn't accept FormGroup or other kinds of objects that have "circular structure"
    let formObject = formData.value;
    console.log(formObject);
    return this.http.post('http://localhost:8080/api/register', formObject).subscribe(response =>{
      console.log("message inside sub");
      console.log(response);
    });

  }



}
