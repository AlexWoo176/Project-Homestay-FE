import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatusHouseComponent } from './edit-status-house.component';

describe('EditStatusHouseComponent', () => {
  let component: EditStatusHouseComponent;
  let fixture: ComponentFixture<EditStatusHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatusHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatusHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
