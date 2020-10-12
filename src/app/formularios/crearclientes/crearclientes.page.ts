import { Component, OnInit } from "@angular/core";

import { FBservicesService } from "../../fbservices.service";

@Component({
  selector: "app-crearclientes",
  templateUrl: "./crearclientes.page.html",
  styleUrls: ["./crearclientes.page.scss"],
})
export class CrearclientesPage implements OnInit {
  //variables para agregar clientes
  tipoIdentificacion: string;
  numeroIdentificacionCliente: string;
  nombresCliente: string;
  apellidosCliente: string;
  empresaCliente: string;
  codigoCiudad: string;
  celularCliente: string;
  direccionCliente: string;
  correoCliente: string;

  constructor(private FB: FBservicesService) {}

  ngOnInit() {}
  guardarCliente() {
    console.log(this.nombresCliente);
    // this.FB.agregarCliente(this.tipoIdentificacion, this.numeroIdentificacionCliente, this.nombresCliente, this.apellidosCliente, this.empresaCliente, this.codigoCiudad, this.celularCliente, this.direccionCliente, this.correoCliente)
  }
  customAlertOptions: any = {
    header: "Seleccione uno",
    translucent: true,
  };
}
