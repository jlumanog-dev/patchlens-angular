import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class authenticationService{
  private http = inject(HttpClient);

  authenticate(FormData: unknown) : Observable<any> {
    //let formObject = FormData.value;
    return this.http.post('http://localhost:8080/api/login', FormData).pipe(
      catchError(error => {
        console.error("Error fetching data:");
        return throwError(()=> error);
      })
    );
  }

  setToken(token: string){
    localStorage.setItem("TOKEN", token);
  }

  deleteToken(){
    localStorage.removeItem("TOKEN");
  }

  isAuthenticated(): boolean{
    const TOKEN = localStorage.getItem("TOKEN");
    return TOKEN != undefined ? true : false;
  }
}
