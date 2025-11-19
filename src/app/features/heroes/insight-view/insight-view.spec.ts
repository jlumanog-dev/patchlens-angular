import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightView } from './insight-view';

describe('InsightView', () => {
  let component: InsightView;
  let fixture: ComponentFixture<InsightView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
