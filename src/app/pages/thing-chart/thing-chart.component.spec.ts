import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingChartComponent } from './thing-chart.component';

describe('ThingChartComponent', () => {
  let component: ThingChartComponent;
  let fixture: ComponentFixture<ThingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
