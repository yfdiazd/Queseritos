import { Component, OnInit } from '@angular/core';
import { FBservicesService } from "../../fbservices.service";


@Component({
  selector: 'app-crearproveedor',
  templateUrl: './crearproveedor.page.html',
  styleUrls: ['./crearproveedor.page.scss'],
})

export class CrearproveedorPage {
  //variables para crear proveedor
  tipoIdentificacionProveedor: String;
  numIndetificacionProveedor: String;
  nombreProveedor: String;
  apellidoProveedor: String;
  telefonoProveedor: String;
  direccionProveedor: String;
  correoProveedor: String;

  constructor(
    private FB: FBservicesService
  ) { }



  crearProveedor() {
    this.FB.crearProveedor(this.tipoIdentificacionProveedor, this.numIndetificacionProveedor, this.nombreProveedor, this.apellidoProveedor, this.telefonoProveedor, this.direccionProveedor, this.correoProveedor)
  };

}
