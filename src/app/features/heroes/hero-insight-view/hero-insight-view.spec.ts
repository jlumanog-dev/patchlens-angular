import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInsightView } from './hero-insight-view';

describe('HeroInsightView', () => {
  let component: HeroInsightView;
  let fixture: ComponentFixture<HeroInsightView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroInsightView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInsightView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
