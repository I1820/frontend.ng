import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingDetailComponent } from './thing-detail.component';

describe('ThingDetailComponent', () => {
  let component: ThingDetailComponent;
  let fixture: ComponentFixture<ThingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
