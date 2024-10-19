import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtiposComponent } from './subtipos.component';

describe('SubtiposComponent', () => {
  let component: SubtiposComponent;
  let fixture: ComponentFixture<SubtiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
