import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeroesView } from './top-heroes-view';

describe('TopHeroesView', () => {
  let component: TopHeroesView;
  let fixture: ComponentFixture<TopHeroesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopHeroesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHeroesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
