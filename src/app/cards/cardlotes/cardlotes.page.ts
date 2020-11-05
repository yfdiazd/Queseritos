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
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {

  }
  public nombreProv: any;
  public idProveedorRecibido: any;



  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.idProveedorRecibido = id;
    this.traerNombre();
  }



  async traerNombre() {
    this.nombreProv = [];
    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.idProveedorRecibido) {
        this.nombreProv = element.nombre;
      }
    })
  }

  irDetalleLote(item) {
    this.FB.getPesajeLoteProveedor(this.idProveedorRecibido, item.lote);   
    this.FB.getAnticipoDirectoProveedor(this.idProveedorRecibido, item.lote);
    this.navCtrl.navigateForward(["detallelote/", item.lote, this.idProveedorRecibido]);
  }

  irInicio() {
    this.navCtrl.navigateBack(["main-menu"]);
  }
  irCompras() {
    this.navCtrl.navigateBack(["cardcompras"]);
  }
  irEstado() {
    this.navCtrl.navigateBack(["cardlistaproveedores"]);
  }


}