import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManobristaComponent } from './manobrista.component';

describe('ManobristaComponent', () => {
  let component: ManobristaComponent;
  let fixture: ComponentFixture<ManobristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManobristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManobristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
