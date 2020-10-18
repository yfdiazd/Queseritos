import { Component, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';
@Component({
  selector: 'app-cardlistaproveedores',
  templateUrl: './cardlistaproveedores.page.html',
  styleUrls: ['./cardlistaproveedores.page.scss'],
})
export class CardlistaproveedoresPage implements OnInit {
  listaprovlote: any[] = [];
  listanombres: any[] = [];
  cont:number =0;
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.listaprovlote = [];
    this.listanombres = [];
    this.FB.pesajeCompraLista.forEach(element => {
      this.listaprovlote.push({ id: element.idProveedor})

    });

    this.FB.proveedoresLista.forEach(element => {
      this.listaprovlote.forEach(element2 => {
        if (element.id == element2.id)
          this.listanombres.push(element.nombre)

      })
    })
  }

  ngOnInit() {
  }

  irCardLote(){
    this.navCtrl.navigateForward('cardlotes');
  }

  reorder(event) {
    console.log(event);
    const itemMover = this.listaprovlote.splice(event.detail.from, 1)[0];
    this.listaprovlote.splice(event.detail.to, 0, itemMover);
    event.detail.complete();
  }

}
