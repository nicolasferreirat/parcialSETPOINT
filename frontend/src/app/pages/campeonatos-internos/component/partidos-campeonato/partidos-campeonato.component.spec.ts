import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosCampeonatoComponent } from './partidos-campeonato.component';

describe('PartidosCampeonatoComponent', () => {
  let component: PartidosCampeonatoComponent;
  let fixture: ComponentFixture<PartidosCampeonatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidosCampeonatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidosCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
