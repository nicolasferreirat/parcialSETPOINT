import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FetchService } from '../../../../services/fetch.service';
import Swal from 'sweetalert2';
import { CampeonatoSignalService } from '../../services/campeonato-signal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comenzar-campeonato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comenzar-campeonato.component.html',
  styleUrl: './comenzar-campeonato.component.css'
})
export class ComenzarCampeonatoComponent implements OnInit {
  fetch: FetchService = inject(FetchService);
  campeonatoSignal: CampeonatoSignalService = inject(CampeonatoSignalService);
  router: Router = inject(Router);
  torneoForm!: FormGroup;
  usuarios: any[] = [];
  jugadores: any[] = [];
  errorMensaje: string = '';
  

  ngOnInit():void {
    this.jugadoresRegistrados()

    this.torneoForm = new FormGroup({
      nombreUsuario1: new FormControl('',Validators.required),
      nombreUsuario2: new FormControl('',Validators.required),
      nombreUsuario3: new FormControl('',Validators.required),
      nombreUsuario4: new FormControl(''),
      nombreUsuario5: new FormControl(''),
      nombreUsuario6: new FormControl(''),
      nombreUsuario7: new FormControl(''),
      nombreUsuario8: new FormControl(''),
      nombreUsuario9: new FormControl(''),
      nombreUsuario10: new FormControl(''),
      nombreUsuario11: new FormControl(''),
      nombreUsuario12: new FormControl(''),

    });
  }
  

  async jugadoresRegistrados(){
    try{
      const response = await this.fetch.get('usuarios');
      this.usuarios = response;
    } catch (error){
      console.error("no se pudieron obtener los jugadores.")
    }
  }

  async iniciarTorneo() {
    if (this.torneoForm.valid) {

      const IdJugadores = [
        this.torneoForm.value.nombreUsuario1,
        this.torneoForm.value.nombreUsuario2,
        this.torneoForm.value.nombreUsuario3,
        this.torneoForm.value.nombreUsuario4,
        this.torneoForm.value.nombreUsuario5,
        this.torneoForm.value.nombreUsuario6,
        this.torneoForm.value.nombreUsuario7,
        this.torneoForm.value.nombreUsuario8,
        this.torneoForm.value.nombreUsuario9,
        this.torneoForm.value.nombreUsuario10,
        this.torneoForm.value.nombreUsuario11,
        this.torneoForm.value.nombreUsuario12,
      ];
      this.jugadores = IdJugadores;
      this.campeonatoSignal.actualizarTorneoData({IdJugadores});
      //necesito mandar estos id a la otra pagina para luego llamar a los jugadores por su ID.

      Swal.fire({
        title: "Crear nuevo CAMPEONATO INTERNO",
        text: '¿Deseas crear un campeonato interno con estos datos?',
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then(async(result) => {
        if (result.isConfirmed) {

        let torneoData = {
          ...this.torneoForm.value,
          ...this.jugadores.values
        };
    
      this.campeonatoSignal.actualizarTorneoData({ ...torneoData});

      Swal.fire({
        title: "¡Creado!",
        text: "El campeonato ha sido creado",
        icon: "success"
      });
      this.router.navigate(['/partidos'])
    }
  });
   }else {
    this.errorMensaje= 'Faltan rellenar campos';
  } 
}

  async mandarJugadores(){
    for (let i=0; i<this.jugadores.length; i++ ){
      try{
        await this.fetch.post('campeonatos', this.jugadores[i])
        
      }
      catch(error){
        console.error("no se pudieron guardar los jugadores.")
      }
    }
  }
}