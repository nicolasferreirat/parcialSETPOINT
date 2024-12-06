import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenzarCampeonatoComponent } from './comenzar-campeonato.component';

describe('ComenzarCampeonatoComponent', () => {
  let component: ComenzarCampeonatoComponent;
  let fixture: ComponentFixture<ComenzarCampeonatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComenzarCampeonatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComenzarCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
