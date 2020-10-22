import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crearanticipos',
  templateUrl: './crearanticipos.page.html',
  styleUrls: ['./crearanticipos.page.scss'],
})
export class CrearanticiposPage implements OnInit {
  proveedor = "fernanda";
  idproveedor = "1053790255";
  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }
  nombreAnticipo: string;

  customAlertOptions: any = {
    header: 'Seleccione anticipo',
    translucent: true
  };

  selectedFile = null;
  onFil(event) {
    this.selectedFile = event.target.files[0];
  }

  upload() {

  }


}
