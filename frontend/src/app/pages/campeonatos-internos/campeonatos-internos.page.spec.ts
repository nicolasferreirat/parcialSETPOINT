import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatosInternosPage } from './campeonatos-internos.page';

describe('CampeonatosInternosPage', () => {
  let component: CampeonatosInternosPage;
  let fixture: ComponentFixture<CampeonatosInternosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampeonatosInternosPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampeonatosInternosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
