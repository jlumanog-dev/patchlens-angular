import { Component, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatAnchor } from "@angular/material/button";
import { ApiService } from '../../../core/services/api';
import { topHeroesMappedInterface } from '../../../shared/TopHeroesMappedInterface';


@Component({
  selector: 'app-top-heroes-view',
  imports: [MatCardModule, MatAnchor],
  templateUrl: './top-heroes-view.html',
  styleUrl: './top-heroes-view.css'
})
export class TopHeroesView {
  private apiService = inject(ApiService);
/*   heroOne = signal<topHeroesMapped>({id: 0, heroStats: {}});
  heroTwo = signal<topHeroesMapped>();
  heroThree = signal<topHeroesMapped>(); */

  heroes = signal<topHeroesMappedInterface[]>([]);


  ngOnInit(){
    this.apiService.getTopHeroes().subscribe({
      next: (response : topHeroesMappedInterface[]) =>{
        this.heroes.set(response.slice(0, 3));
        for (let index = 0; index < response.length; index++) {
          console.log(response[index]);

        }
      },

      error: error =>{
        console.log("ERROR fetching top heroes");
        throw error;
      }
    })
  }
}
