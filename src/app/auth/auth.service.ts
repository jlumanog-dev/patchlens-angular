import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
@Injectable({providedIn: 'root'})
export class authenticationService{
  private http = inject(HttpClient);

  authenticate(FormData: unknown) : Observable<any> {
    //let formObject = FormData.value;
    return this.http.post(environment.apiBaseUrl + '/api/login', FormData).pipe(
     /*  catchError(error => {
        console.error("Error fetching data:");
        return throwError(()=> error);
      }) */
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
    //check if token is not empty or not expired
    return (TOKEN != undefined)  ? true : false;
  }
}
