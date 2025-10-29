import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api";
import { authenticationService } from "../../auth/auth.service";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>>{
  const auth = inject(authenticationService);
  console.log("interceptor inside");
  if(auth.isAuthenticated()){
    const token = localStorage.getItem("TOKEN");
    console.log("is authenticated");
    console.log(token);
    //clone the request and mutate header to attach token
    const reqWithHeader = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
    console.log(reqWithHeader);
    return next(reqWithHeader);
  }
  return next(req);
}

