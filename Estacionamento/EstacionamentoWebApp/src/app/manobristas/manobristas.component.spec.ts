import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManobristasComponent } from './manobristas.component';

describe('ManobristasComponent', () => {
  let component: ManobristasComponent;
  let fixture: ComponentFixture<ManobristasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManobristasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManobristasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
