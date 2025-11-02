import { Component, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatAnchor } from "@angular/material/button";
import { ApiService } from '../../../core/services/api';

@Component({
  selector: 'app-top-heroes-view',
  imports: [MatCardModule, MatAnchor],
  templateUrl: './top-heroes-view.html',
  styleUrl: './top-heroes-view.css'
})
export class TopHeroesView {
  private apiService = inject(ApiService);


  ngOnInit(){
    this.apiService.getTopHeroes().subscribe({
      next: (response : Array<object>) =>{
        console.log(response);
        response.forEach(element => {
        });
      },
      error: error =>{
        console.log("ERROR fetching top heroes");
        throw error;
      }
    })
  }
}
