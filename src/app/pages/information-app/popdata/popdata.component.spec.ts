import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdataComponent } from './popdata.component';

describe('PopdataComponent', () => {
  let component: PopdataComponent;
  let fixture: ComponentFixture<PopdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
