import { Component, OnInit } from '@angular/core';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-crearconductor',
  templateUrl: './crearconductor.page.html',
  styleUrls: ['./crearconductor.page.scss'],
})
export class CrearconductorPage implements OnInit {
  //Variables para agregar conductores
  tipoIdentificacionConductor: string;
  numeroIdentificacionConductor: string;
  nombreConductor: string;
  apelidoConductor: string;
  celularConductor: string;

  constructor(
    private FB: FBservicesService

  ) { }

  ngOnInit() {
  }
  guardarConductor() {
    this.FB.agregarConductor("1", this.numeroIdentificacionConductor, this.nombreConductor, this.apelidoConductor, this.celularConductor);
  }


}
