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
export class CardlotesPage implements OnInit{
  idproveedor="Fernanda";
  numlote: "15-10-2020 - L1";
  totalBulto: "10";
  costoTotalCompra: "$1000.000";
  pesoBultos: "240"
  constructor(
    private router: Router,
    private FB: FBservicesService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { 
   // this.FB.listaOrdenLotes()
    
  }
  ngOnInit(){
    
  }


irDetalleLote(){
  this.navCtrl.navigateForward(["detallelote"]);
}


}