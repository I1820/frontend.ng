import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetNewComponent } from './asset-new.component';

describe('AssetNewComponent', () => {
  let component: AssetNewComponent;
  let fixture: ComponentFixture<AssetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
