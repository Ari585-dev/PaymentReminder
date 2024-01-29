import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesManagementComponent } from './dates-management.component';

describe('DatesManagementComponent', () => {
  let component: DatesManagementComponent;
  let fixture: ComponentFixture<DatesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
