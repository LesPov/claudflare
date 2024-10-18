import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficialComponent } from './oficial.component';

describe('OficialComponent', () => {
  let component: OficialComponent;
  let fixture: ComponentFixture<OficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
