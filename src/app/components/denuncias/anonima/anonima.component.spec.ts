import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonimaComponent } from './anonima.component';

describe('AnonimaComponent', () => {
  let component: AnonimaComponent;
  let fixture: ComponentFixture<AnonimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnonimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
