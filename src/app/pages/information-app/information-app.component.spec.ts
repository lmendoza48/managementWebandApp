import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAPPComponent } from './information-app.component';

describe('InformationAPPComponent', () => {
  let component: InformationAPPComponent;
  let fixture: ComponentFixture<InformationAPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationAPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationAPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
