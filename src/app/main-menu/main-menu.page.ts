import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from '@angular/router';
import { FBservicesService } from '../fbservices.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  constructor(private menu: MenuController, private router:Router,private FB: FBservicesService) { }


  irVender(){
    this.router.navigate(["cardcompras"]);
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
  }

  irPageTipoQueso(){
    this.router.navigate(["crearproducto"]);
  }

  irPageEstadoQueso(){
    this.router.navigate(["crearestadoproducto"]);
  }

  irPageRegistrarProveedor(){
    this.router.navigate(["crearproveedor"]);
  }

  irPageTipoAnticipo(){
    this.router.navigate(["crearanticipos"]);
    }
  
  irPageTipoTrueque(){
      this.router.navigate(["creartipostrueque"]);
    
  }

  irPageTipoIdentificacion(){
    this.router.navigate(["creartiposidentificacion"]);
  }
  
  irPageRegistrarCliente(){
    this.router.navigate(["homeclientes"]);
  
}

irPageCrearCiudad(){
  this.router.navigate(["crearciudad"]);

}

irPageRegistrarConductor(){
  this.router.navigate(["crearconductor"]);
}

}
