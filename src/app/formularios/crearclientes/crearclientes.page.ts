import { Component, OnInit } from '@angular/core';

import { FBservicesService } from '../../fbservices.service';

@Component({
  selector: 'app-crearclientes',
  templateUrl: './crearclientes.page.html',
  styleUrls: ['./crearclientes.page.scss'],
})
export class CrearclientesPage implements OnInit {
  //variables para agregar clientes
  tipoIdentificacion: string;
  numeroIdentificacionCliente: string;
  nombresClietne: string;
  apellidosCliente: string;
  empresaCliente: string;
  codigoCiudad: string;
  celularCliente: string;
  direccionCliente: string;
  correoCliente: string;

  constructor(
    private FB: FBservicesService

  ) { }

  ngOnInit() {
  }
  guardarCliente(){
    this.FB.agregarCliente("1112", this.numeroIdentificacionCliente, this.nombresClietne, this.apellidosCliente, this.empresaCliente, "1", this.celularCliente, this.direccionCliente, this.correoCliente)
  }


}
