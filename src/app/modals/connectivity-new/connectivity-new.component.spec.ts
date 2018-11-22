import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectivityNewComponent } from './connectivity-new.component';

describe('ConnectivityNewComponent', () => {
  let component: ConnectivityNewComponent;
  let fixture: ComponentFixture<ConnectivityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectivityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectivityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
