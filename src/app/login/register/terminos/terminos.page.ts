import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private modalController: ModalController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  volver() {
    this.navCtrl.navigateBack(["registrar-usuario"]);
  }

}
