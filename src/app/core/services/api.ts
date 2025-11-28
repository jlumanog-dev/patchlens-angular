import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserInterface } from "../../shared/UserInterface";
import { catchError } from "rxjs";
import { authenticationService } from "../../auth/auth.service";
import { HeroesInterface } from "../../shared/HeroesInterface";
import { RecentMatchAggregateInterface } from "../../shared/RecentMatchAggregateInterface";

@Injectable({providedIn: 'root'})
export class ApiService{

  private http = inject(HttpClient);
  private authService = inject(authenticationService);

  //attempt to register a new user
  registerUser(formData: FormGroup){

    //circular structure means object contains a reference to itself
    //http.post doesn't accept FormGroup or other kinds of objects that have "circular structure"
    let formObject = formData.value;
    console.log(formObject);
    return this.http.post('http://localhost:8080/api/register', formObject).pipe(catchError(error => {
      console.log("error response at api.ts");
      console.log(error);
      throw error;
    }));

  }

  getUserData(){
    //map the response object to the UserInterface defined in shared folder to access dynamic properties
    //without the text editor complaining that no property exist
    return this.http.get<UserInterface>('http://localhost:8080/api/user', {responseType: 'json'}).pipe(catchError(error => {
      console.log("JWT EXPIRED");
      this.authService.deleteToken();
      throw error;
    }));
  }

  getTopHeroes(){
    return this.http.get<HeroesInterface[]>('http://localhost:8080/api/heroes/top-heroes', {responseType: 'json'}).pipe(catchError(error=>{
      console.log("FAILED TO RETRIEVE TOP HEROES");
      this.authService.deleteToken();
      throw error;
    }));
  }

  getHeroData(heroId : number){
    return this.http.get<HeroesInterface>(`http://localhost:8080/api/heroes/${heroId}`, {responseType: 'json'}).pipe(catchError(error =>{
      console.log("FAILED TO RETRIEVE A HERO");
      this.authService.deleteToken();
      throw error;
    }));
  }

  getAllHeroesData(){
    return this.http.get<HeroesInterface[]>('http://localhost:8080/api/heroes/all-heroes', {responseType: 'json'}).pipe(catchError(error=>{
      throw error;
    }));
  }

  getHeroesPlayedByUser(){
    return this.http.get<HeroesInterface[]>('http://localhost:8080/api/user/heroes', {responseType: 'json'}).pipe(catchError(error=>{
      throw error;
    }))
  }
  getRecentMachesByUser(){
    return this.http.get<RecentMatchAggregateInterface>('http://localhost:8080/api/user/recentMatches', {responseType: 'json'}).pipe(catchError(error =>{
      throw error;
    }))
  }





}
