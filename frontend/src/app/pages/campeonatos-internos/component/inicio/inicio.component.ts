import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private router: Router = inject(Router);

  async comenzarCampeonato(){
    this.router.navigate(['/campeonatoInterno'])
  }
}
