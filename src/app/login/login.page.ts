import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Router } from '@angular/router';
import { FBservicesService } from "../fbservices.service";
import * as firebase from "firebase";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  //variables para iniciar sesion
  email
  password

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private FB: FBservicesService
  ) { }

  irPaginaRegistro() {
    this.navCtrl.navigateForward(["register"]);
  }
  irRecuperar() {
    this.navCtrl.navigateForward(["recuperar"]);
  }

  //Metodo que inicia sesion
  irPaginaHome() {
    this.FB.iniciarSesion(this.email, this.password);
  }

}
