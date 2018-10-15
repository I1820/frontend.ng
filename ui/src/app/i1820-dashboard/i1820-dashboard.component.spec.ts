
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { I1820DashboardComponent } from './i1820-dashboard.component';

describe('I1820DashboardComponent', () => {
  let component: I1820DashboardComponent;
  let fixture: ComponentFixture<I1820DashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ I1820DashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(I1820DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
