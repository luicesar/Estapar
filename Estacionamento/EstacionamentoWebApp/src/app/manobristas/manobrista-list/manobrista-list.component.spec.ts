import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManobristaListComponent } from './manobrista-list.component';

describe('ManobristaListComponent', () => {
  let component: ManobristaListComponent;
  let fixture: ComponentFixture<ManobristaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManobristaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManobristaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
