import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FBservicesService } from 'src/app/fbservices.service';
import { AlertController } from '@ionic/angular';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
@Component({
  selector: 'app-cardlotes',
  templateUrl: './cardlotes.page.html',
  styleUrls: ['./cardlotes.page.scss'],
})
export class CardlotesPage{
  idproveedor="Fernanda"
  constructor(
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { 
   // this.FB.listaOrdenLotes()
    
  }

  irCompraDetallada() {
    this.navCtrl.navigateForward(["cardcompradetallada"]);
  }

  listaProveedores: any[];
  input = { data: [] };


}
