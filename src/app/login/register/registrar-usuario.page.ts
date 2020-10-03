import { Component, OnInit } from '@angular/core';
import { FBservicesService } from "../../fbservices.service";
import { AlertController, ToastController } from "@ionic/angular";



@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage {
  email;
  password;
  password2;
  user;
  constructor(
    public alertController: AlertController,
    private FB: FBservicesService,
    public toastController: ToastController

  ) {}

  crear(){
    this.FB.crearUsuario(this.email, this.password, this.user, this.password2);
  }

}
