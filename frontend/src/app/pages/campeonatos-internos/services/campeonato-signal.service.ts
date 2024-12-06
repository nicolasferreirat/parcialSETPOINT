import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoSignalService {

  public torneoDataSignal = signal<any>(null);

  constructor() {
    const torneoGuardado = localStorage.getItem('torneoData');
    if (torneoGuardado) {
      this.torneoDataSignal.set(JSON.parse(torneoGuardado));
    }
  }

  actualizarTorneoData(data: any) {
    this.torneoDataSignal.set(data);
  }

  obtenerTorneoData() {
    return this.torneoDataSignal();
  }

  resetTorneoData() {
    this.torneoDataSignal.set({
      resultados: {},
      id_jugador1: '',
      id_jugador2: '',
      id_jugador3: '',
      id_jugador4: '',
      id_jugador5: '',
      id_jugador6: '',
      id_jugador7: '',
      id_jugador8: '',
      editarTorneoVisible: true,
    });
  }
}
