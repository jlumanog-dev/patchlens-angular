import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hero-detail',
  imports: [MatCardModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css'
})
export class HeroDetail {
  router = inject(ActivatedRoute);
  heroName = signal('');
  constructor(){
    this.router.params.subscribe((param => {
      this.heroName.set(param['id']);
  }))
  }
}
