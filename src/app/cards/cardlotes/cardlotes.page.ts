import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-cardlotes',
  templateUrl: './cardlotes.page.html',
  styleUrls: ['./cardlotes.page.scss'],
})
export class CardlotesPage implements OnInit {
  idproveedor = "Fernanda";
  numlote: "15-10-2020 - L1";
  totalBulto: "10";
  costoTotalCompra: "$1000.000";
  pesoBultos: "240";

  public nombreProv: any;
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
  }

  public idProveedorRecibido: any;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedorRecibido = id;
    this.traerNombre();
  }

  traerNombre() {
    this.nombreProv = [];
    console.log("Nombre prov", this.idProveedorRecibido);

    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.idProveedorRecibido) {
        this.nombreProv = element.nombre;
      }
    })
  }

  irDetalleLote(item) {
    console.log("Datos a enviar", this.idProveedorRecibido, item);
    this.FB.getPesajeLoteProveedor(this.idProveedorRecibido, item);
    this.FB.getAnticiposLoteProveedor(this.idProveedorRecibido, item);
    this.navCtrl.navigateForward(["detallelote/", item, this.idProveedorRecibido]);
  }


}