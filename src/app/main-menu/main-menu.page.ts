import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  constructor(private menu: MenuController, private router:Router) { }

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
    this.router.navigate(["login"]);
  }

  irPageEstadoQueso(){
    this.router.navigate(["login"]);
  }

  irPageRegistrarProveedor(){
    this.router.navigate(["login"]);
  }

  irPageRegistrarProveedor(){
  this.router.navigate(["login"]);
  }

  irPageTipoAnticipo(){
    this.router.navigate(["login"]);
    }
  
  irPageTipoTrueque(){
      this.router.navigate(["login"]);
    
  }

  irPageRegistrarCliente(){
    this.router.navigate(["login"]);
  
}

irPageCrearCiudad(){
  this.router.navigate(["login"]);

}

irPageRegistrarConductor(){
  this.router.navigate(["login"]);
}

}
