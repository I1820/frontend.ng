import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingNewComponent } from './thing-new.component';

describe('ThingNewComponent', () => {
  let component: ThingNewComponent;
  let fixture: ComponentFixture<ThingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
