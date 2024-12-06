import { Component, inject, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-campeonatos-internos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './campeonatos-internos.page.html',
  styleUrl: './campeonatos-internos.page.css'
})
export class CampeonatosInternosPage implements OnInit{
  fetch: FetchService = inject(FetchService);

  jugadores: any[] = [];
  partidos: { jugador1: any, jugador2: any, fecha: Date}[] = [];


  ngOnInit():void {
    this.jugadoresRegistrados()
  }

  async jugadoresRegistrados(){
    try{
      const response = await this.fetch.get('usuarios/doceusuarios');
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
