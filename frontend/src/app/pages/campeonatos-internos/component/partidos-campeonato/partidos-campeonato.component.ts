import { Component, effect, inject } from '@angular/core';
import { CampeonatoSignalService } from '../../services/campeonato-signal.service';
import { ComenzarCampeonatoComponent } from '../comenzar-campeonato/comenzar-campeonato.component';
import { NgFor, NgIf } from '@angular/common';
import { FetchService } from '../../../../services/fetch.service';

@Component({
  selector: 'app-partidos-campeonato',
  standalone: true,
  imports: [ComenzarCampeonatoComponent, NgIf, NgFor],
  templateUrl: './partidos-campeonato.component.html',
  styleUrl: './partidos-campeonato.component.css'
})
export class PartidosCampeonatoComponent {
  torneoData: any = {};
  editarTorneoVisible!: boolean;
  errorMensaje: string = '';
  jugadores: any[] = [];
  partidos: { jugador1: any, jugador2: any, fecha: Date}[] = [];


  
  constructor(
    private campeonatoSignal: CampeonatoSignalService,
    private fetch: FetchService

  ) {
    effect(() => {
      this.torneoData = this.campeonatoSignal.obtenerTorneoData();
    });
    
  }
  //Acá necesito obtener los id de los jugadores seleccionados por el usuario desde el torneo data para asi manipularlos y hacer la llamada al back con el id de cada usuario para poder armar los partidos.
  ngOnInit(): void {
    this.jugadoresRegistrados()
  }


  async jugadoresRegistrados(){
    try{
      const response = await this.fetch.get('campeonatos');
      this.jugadores = response;
      const fecha = new Date('2024-12-05');
      this.partidos = this.crearPartidos(this.jugadores, fecha);
    } catch (error){
      console.error("no se pudieron obtener los jugadores.")
    }
  }

  crearPartidos(jugadores: any[], fechaInicio : Date){
    const partidos: {jugador1: any, jugador2: any, fecha: Date}[] = []
    let fechaActual = new Date(fechaInicio);
    
    for (let i = 0; i < jugadores.length; i++) {
      for (let j = i+1; j < jugadores.length; j++){
        if (jugadores[i].nombre !== jugadores[j].nombre && jugadores[i].apellido !== jugadores[j].apellido ) {
          partidos.push({
            jugador1: jugadores[i],
            jugador2: jugadores[j],
            fecha: new Date(fechaActual)
          })
          fechaActual.setDate(fechaActual.getDate() + 1);
        }
      }
    }
    return partidos;
  }

}
