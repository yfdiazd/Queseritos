import { Component, Input, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-cardlistaclientes',
  templateUrl: './cardlistaclientes.page.html',
  styleUrls: ['./cardlistaclientes.page.scss'],
})
export class CardlistaclientesPage implements OnInit {
  listanombres: any[] = [];
  nombres: string;
  cont: number = 0;
  items: any;
  objlistanombres: any
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private route: ActivatedRoute,

  ) {
    this.listarnombresclientes();

  }

  ngOnInit() {

  }


  getItems(ev: any) {
    this.listanombres;
    let val = ev.target.value;
    if (val && val.trim() != '') {

      this.listanombres = this.listanombres.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1)

      })

    }
    else {
      if (val == '' || val == undefined) {
        return this.listarnombresclientes();


      }

    }
  }

  listarnombresclientes() {
    this.listanombres = [];
    this.FB.clientesLista.forEach(element => {
      this.listanombres.push((element.nombres + " " + element.apellidos))

    })
    return this.listanombres;
  }


  irCardListaClientes(input) {
    this.FB.clientesLista.forEach(element => {
      if (element.nombres + " " + element.apellidos == input) {
        this.FB.getVentaCliente(element.id);
        this.FB.getVentaClienteMes(element.id);
        this.navCtrl.navigateForward(['cardventas/', element.id]);
      }


    })


  }

  irInicio() {
    this.navCtrl.navigateBack(["main-menu"]);
  }
  irCompras() {
    this.FB.getProveedorCompra();
    this.FB.getAnticipoProveedor();
    this.navCtrl.navigateBack(["cardcompras"]);
  }
  irEstado() {
    this.navCtrl.navigateBack(["cardlistaproveedores"]);
  }
}
