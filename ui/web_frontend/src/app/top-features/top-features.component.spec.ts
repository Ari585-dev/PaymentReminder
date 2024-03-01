import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFeaturesComponent } from './top-features.component';

describe('TopFeaturesComponent', () => {
  let component: TopFeaturesComponent;
  let fixture: ComponentFixture<TopFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
